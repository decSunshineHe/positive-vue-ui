import { ElMessageBox } from "element-plus";
import { Subject, Subscription } from "rxjs";

const httpStatusSubject = new Subject<number>();

export async function fetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const compoundInit: RequestInit = {
    credentials: "include",
    ...init,
  };

  if (compoundInit.headers instanceof Headers) {
    if (!compoundInit.headers.has("Accept")) {
      compoundInit.headers.set("Accept", "application/json");
    }
    if (!compoundInit.headers.has("Content-Type") && init?.body) {
      compoundInit.headers.set(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
    }
    if (
      compoundInit.headers.has("Content-Type") &&
      compoundInit.headers.get("Content-Type") === "multipart/form-data"
    ) {
      compoundInit.headers.delete("Content-Type");
    }
  } else {
    const defaultHeaders: { [key: string]: string } = {
      Accept: "application/json",
    };
    if (init?.body) {
      defaultHeaders["Content-Type"] = "application/json;charset=UTF-8";
    }
    compoundInit.headers = {
      ...defaultHeaders,
      ...compoundInit.headers,
    };
  }
  const response = await window.fetch(input, compoundInit);
  httpStatusSubject.next(response.status);
  const text = await response.text();
  let body: any = undefined;
  if (text) {
    body = JSON.parse(text);
  }
  if (!response.ok) {
    throw new ResponseCodeError(
      response.status,
      body?.errorType,
      body?.errorMessage,
      body
    );
  } else {
    if (body?.code === 401) {
      window.location.assign(
        "/server/landing?to=" + encodeURIComponent(window.location.href)
      );
      // if (process.env.NODE_ENV === "development") {
      //   console.log("未登录，跳转到登录页面");
      //   ElMessageBox.confirm(
      //     "检测到您尚未登录登录，是否跳转到登录页面？",
      //     "账号登录",
      //     {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning",
      //     }
      //   ).then(() => {
      //     window.location.assign(
      //       "/server/landing?to=" + encodeURIComponent(window.location.href)
      //     );
      //   });
      // } else {
      //   window.location.assign(
      //     "/server/landing?to=" + encodeURIComponent(window.location.href)
      //   );
      // }
    }
  }
  return body?.data;
}

export class ResponseCodeError extends Error {
  readonly status: number;
  readonly errorType?: string;
  readonly errorMessage?: string;
  readonly body?: any;

  constructor(
    status: number,
    errorType?: string,
    errorMessage?: string,
    body?: any
  ) {
    super();
    this.status = status;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.body = body;
  }

  static getMessage(err: any): string | undefined;
  static getMessage(err: any, defaultMessage: string): string;
  static getMessage(err: any, defaultMessage?: string): string | undefined {
    return (
      (err instanceof ResponseCodeError && err.errorMessage) || defaultMessage
    );
  }
}

export function observeHttpStatus(
  listener: (status: number) => void
): Subscription {
  return httpStatusSubject.subscribe(listener);
}
