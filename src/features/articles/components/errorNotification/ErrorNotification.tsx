import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { requestStatus } from "@/redux/utils";
import notify from "@/utils/notify";

function ErrorNotification() {
  const { error, status } = useAppSelector((state) => state.articles);
  const isRejected = status === requestStatus.failed;

  useEffect(() => {
    if (error && isRejected) {
      notify.error(error);
    }
  }, [error, status]);

  return <></>;
}

export default ErrorNotification;
