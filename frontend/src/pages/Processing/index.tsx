import { useDocumentTitle } from "@uidotdev/usehooks";
import { Preloader, ReadyToUse } from "./ui";
import { useState } from "react";
import { useEffect } from "react";
import { GitApi } from "@api";
import { useLocation, useNavigate } from "react-router-dom";

export const Processing = () => {
  useDocumentTitle(
    "RepoDock - подождите операция выполняется"
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const repositoryUrl = location.state?.repositoryUrl;
    if (repositoryUrl) {
      GitApi.cloneRepository(repositoryUrl).then(() => {
        setIsLoading(false);
      });
    } else {
      // Если URL не найден, перенаправляем обратно на главную
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading && <ReadyToUse />}
    </>
  );
};
