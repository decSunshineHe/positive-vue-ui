import { BehaviorSubject, Subscription } from 'rxjs';

export interface ISubjectHolder<T> {
  subscribe(callback: (data?: T) => void): Subscription;
  current(): T | undefined;
  resetData(): void;
  refreshData(callback?: () => void): void;
}

export class SubjectHolder<T> implements ISubjectHolder<T> {
  private readonly subject: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  private data?: T;
  private asyncGetData?: () => Promise<T>;
  private sending = false;
  constructor(asyncGetData?: () => Promise<T>) {
    if (asyncGetData) {
      this.asyncGetData = asyncGetData;
    }
    this.subscribe(data => {
      this.data = data;
    });
    this.getData();
  }

  subscribe(callback: (data?: T) => void): Subscription {
    return this.subject.subscribe(callback);
  }

  private async getData(callback?: () => void) {
    if (this.sending) return;
    if (this.asyncGetData) {
      this.sending = true;
      try {
        const res = await this.asyncGetData();
        this.subject.next(res);
        callback && callback();
      } catch (e) {
        console.error(e);
      }
      this.sending = false;
    }
  }

  resetData() {
    this.subject.next(undefined);
  }

  refreshData(callback?: () => void) {
    this.getData(callback);
  }

  current(): T | undefined {
    return this.data;
  }
}

export function lazyHolderSingletonGetter<T>(supplier: () => ISubjectHolder<T>): () => ISubjectHolder<T> {
  let instance: ISubjectHolder<T>;
  return () => {
    if (!instance) {
      instance = supplier();
    }
    return instance;
  };
}
