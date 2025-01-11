import React from "react";
import UpdateUser from "@/components/UpdateUser";
const page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <UpdateUser params={params} />;
};

export default page;
