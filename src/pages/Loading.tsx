const Loading = () => {
  return (
    <div className="flex text-center justify-center items-center min-h-screen bg-black text-slate-500">
      <div
        className="absolute w-52 h-52 rounded-full
                      before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:shadow-[0_0_5px_5px_rgba(255,255,255,0.3)]
                      ring"></div>
      <span className="uppercase">loading...</span>
    </div>
  );
};

export default Loading;
