import Balance from "./balance";

export default function Home() {
  return (
    <div>
      <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-16 relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 border-2 border-transparent rounded-lg bg-white/30 backdrop-blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <Balance />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
