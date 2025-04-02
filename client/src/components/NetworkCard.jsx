import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

const NetworkCard = ({ network }) => {
  const { id, name, logo, slogan } = network;

  const renderLogo = () => {
    switch (id) {
      case "mtn":
        return (
          <div className="border-4 border-black rounded-full p-3 inline-flex items-center justify-center">
            <span className="text-2xl font-bold text-black">MTN</span>
          </div>
        );
      case "at":
        return (
          <span className="text-5xl">
            <span className="text-[#FE5000] font-bold">a</span>
            <span className="text-[#0044AA] font-bold">t</span>
          </span>
        );
      case "telecell":
        return (
          <div className="flex items-center">
            <span className="text-5xl text-[#E62B1E] font-bold">t</span>
            <span className="text-2xl text-[#E62B1E] font-bold">telecell</span>
          </div>
        );
      default:
        return <div>{name}</div>;
    }
  };

  return (
    <Link href={`/network/${id}`}>
      <Card className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-48 h-24 mb-4 flex justify-center items-center">
            {renderLogo()}
          </div>
          <div className="mt-4">
            <p className="text-center text-lg font-medium text-gray-700">
              {slogan || "data"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NetworkCard;
