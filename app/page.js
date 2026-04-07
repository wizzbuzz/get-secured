import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-cover bg-center h-full w-full absolute" style={{ backgroundImage: "url('/images/bread.png')" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#a04444] w-[40%] text-center p-8">
            <h2>Welcome to Brooklyn Bakery!</h2>
            <p>We have more than 1000 years of bread expertise!</p>
            <p>We bake everything from apfel strudel to the zeeuwse bolus.</p>
            <p>Take a look around our page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
