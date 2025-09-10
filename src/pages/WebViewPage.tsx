// import { Hospital } from "lucide-react";
// export default function WebViewPage() {
//   return (
//     <div className="h-[80vh] bg-base-100 flex flex-col items-center justify-center px-6 py-12">
//       {/* Hero Section */}
//       <div className="hero w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-center justify-center">
//         {/* Image / Illustration */}
//         <img
//           src="/images/logo.png"
//           alt="App Mockup"
//           className="max-w-xs lg:max-w-md mx-auto"
//         />

//         {/* Text Section */}
//         <div className="text-center lg:text-left max-w-lg mx-auto">
//           <h1 className="text-4xl font-bold text-primary mb-4">
//             Akses Mudah Layanan Kesehatan
//           </h1>
//           <p className="text-lg text-base-content mb-6">
//             Unduh aplikasi{" "}
//             <span className="font-bold bg-yellow-200 px-1 rounded">
//               CMHealth
//             </span>{" "}
//             untuk melakukan konsultasi online, booking dokter, dan mendapatkan
//             informasi layanan terbaru.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
//             {/* Play Store */}
//             <a
//               href="https://play.google.com/store/apps/details?id=com.ciputramitra.consultation&pcampaignid=web_share"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-primary btn-lg gap-2 rounded-full"
//             >
//               <img
//                 src="/images/playstore-icon.svg"
//                 alt="Google Play"
//                 className="w-5 h-5"
//               />
//               Play Store
//             </a>

//             {/* Website */}
//             <a
//               href="https://www.ciputramitrahospital.id/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-secondary btn-lg gap-2 rounded-full"
//             >
//               <Hospital size={20} />
//               Website
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Hospital, Smartphone } from "lucide-react";

export default function WebViewPage() {
  return (
    <div className="h-[80vh] bg-base-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <div className="hero w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-center justify-center">
        {/* Image / Illustration */}
        <img
          src="/images/logo.png"
          alt="App Mockup"
          className="max-w-xs lg:max-w-md mx-auto pt-10 sm:pt-0"
        />

        {/* Text Section */}
        <div className="text-center lg:text-left max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Akses Mudah Layanan Kesehatan
          </h1>
          <p className="text-lg text-base-content mb-6">
            Akses layanan Ciputra Mitra Hospital melalui{" "}
            <span className="font-bold bg-yellow-200 px-1 rounded">
              CMHealth
            </span>{" "}
            untuk konsultasi online, booking dokter, mendapatkan informasi
            terbaru, atau kunjungi website resmi kami.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
            {/* Play Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ciputramitra.consultation&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg gap-2 rounded-full"
            >
              <Smartphone size={20} />
              Play Store
            </a>

            {/* Website */}
            <a
              href="https://www.ciputramitrahospital.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg gap-2 rounded-full"
            >
              <Hospital size={20} />
              Website
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6280332160308"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-lg gap-2 rounded-full"
            >
              <img
                src="/images/whatsapp-icon.svg"
                alt="WhatsApp"
                className="w-5 h-5"
              />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
