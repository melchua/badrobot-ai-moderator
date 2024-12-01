const DocsPage = async ({ params }: { params: { id: string[] } }) => {
  // console.log("arapms", params)

  const { id } = await params
  return <div>Docs page {id} </div>
}

export default DocsPage
