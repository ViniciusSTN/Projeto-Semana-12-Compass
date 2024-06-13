export const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray100"></div>
    </div>
  )
}
