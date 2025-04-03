import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BundleForm from "@/components/BundleForm";
import { getNetworkById, getBundlesByNetworkId, getPaymentNetworks } from "@/lib/data";

const NetworkPage = () => {
  const { id } = useParams();
  const [network, setNetwork] = useState(null);
  const [bundles, setBundles] = useState([]);
  const [momoNetworks, setMomoNetworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const networkData = getNetworkById(id);
        const bundlesData = getBundlesByNetworkId(id);
        const momoNetworksData = getPaymentNetworks();

        setNetwork(networkData);
        setBundles(bundlesData);
        setMomoNetworks(momoNetworksData);
      } catch (error) {
        console.error("Error loading network data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const renderNetworkLogo = () => {
    if (!network) return null;

    switch (network.id) {
      case "mtn":
        return (
          <div className="border-2 border-yellow-400 rounded-full p-2 inline-flex items-center justify-center mr-4">
            <span className="text-lg font-bold text-yellow-400">MTN</span>
          </div>
        );
      case "at":
        return (
          <div className="inline-flex items-center justify-center mr-4">
            <span className="text-4xl">
              <span className="text-[#FE5000] font-bold">A</span>
              <span className="text-[#0044AA] font-bold">T</span>
            </span>
          </div>
        );
      case "telecel":
        return (
          <div className="inline-flex items-center justify-center mr-4">
            <span className="text-3xl text-[#E62B1E] font-bold">Telecel</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!network) {
    return (
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Network not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <a className="text-black hover:text-gray-700 inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to networks
            </a>
          </Link>
        </div>

        <Card className="shadow overflow-hidden">
          <CardHeader className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
            {renderNetworkLogo()}
            <h2 className="text-2xl font-bold text-gray-900">
              {network.name} Data Bundles
            </h2>
          </CardHeader>
          <CardContent className="px-4 py-5 sm:px-6">
            <p className="text-gray-500 mb-6">
              {network.id === "mtn" 
                ? "Explore our range of flexible non-expiry data bundles which gives you lots of packages to choose from according to your budget. Register for MTN now and get access to amazing monthly and weekly call plans."
                : network.id === "at"
                ? "Choose from our wide range of AT data bundles at affordable prices. Life is simple with AT network."
                : "Get the best value with Telecel data packages. Fast and reliable internet connection for all your needs."
              }
            </p>

            <BundleForm 
              network={network} 
              bundles={bundles} 
              momoNetworks={momoNetworks} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NetworkPage;
