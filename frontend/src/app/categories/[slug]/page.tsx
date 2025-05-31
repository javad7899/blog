import React from "react";

const CategoryDetailsPage = ({ params }: { params: { slug: string } }) => {
  return <div>ArticleDetailPage - {params.slug}</div>;
};

export default CategoryDetailsPage;
