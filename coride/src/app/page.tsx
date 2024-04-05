export default function Home() {
  return (
    <>
    <div>
      <h1 className="text-5xl font-bold mt-40 ml-40">AnyTime, AnyWhere <br></br>with CoRide</h1>
      <input 
            type="text" 
            placeholder="Where From" 
            className="border-2 border-black rounded-md mt-10 ml-52 py-2 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
        <br></br>
        <input 
            type="text" 
            placeholder="Where From" 
            className="border-2 border-black rounded-md m-10 ml-52 py-2 px-4 h-14 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
        />
    </div>
    </>
  );
}
