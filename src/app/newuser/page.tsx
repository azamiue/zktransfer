import UserTypeSelector from "./userselection";

function HomePage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-5">
        <div className="p-16 relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 border-2 border-transparent border-opacity-50 rounded-lg bg-white/30 backdrop-blur-lg pointer-events-none"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-[20px] mb-4">
              Welcome to our Transfer Service
            </h1>
            <UserTypeSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
