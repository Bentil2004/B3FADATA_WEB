import NetworkCard from "@/components/NetworkCard";
import { networks } from "@/lib/data";

const Home = () => {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Stay connected always with our{" "}
            <span className="border-b-2 border-yellow-400">
              affordable data bundles
            </span>{" "}
            and AFA registrations.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            Explore our range of flexible non-expiry data bundles which gives you lots of packages to choose from according to your budget. Register for MTN AFA now and get access to amazing monthly and weekly call plans.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {networks.map((network) => (
            <NetworkCard key={network.id} network={network} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
