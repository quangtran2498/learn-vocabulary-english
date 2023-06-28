import { useState, useCallback } from "react";

const useReRenderPage = () => {
  const [state, setState] = useState<object>({});

  const handleForceUpdate = useCallback(() => {
    setState({});
  }, []);

  return [state, handleForceUpdate] as const;
};

export default useReRenderPage;
//! bắt phải re-render lại component