import React from "react";

import { useQuery } from "react-query";

const FindTest = () => {
  const { data } = useQuery("providersData", async () => {
    const response = await fetch("/data");
    const data = await response.json();
    return data;
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export { FindTest };
