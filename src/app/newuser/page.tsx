import UserTypeSelector from "./userselection";

function HomePage() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-5">
        <h1 className="text-[20px]">Welcome to our Transfer Service</h1>
        <UserTypeSelector />
      </div>
    </div>
  );
}

export default HomePage;
