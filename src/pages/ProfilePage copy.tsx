export default function ProfilePage() {
  return (
    <div className="h-full overflow-y-auto lg:h-auto w-full bg-blue-200/80">
      <div className="relative max-w-xl mx-auto">
        {/* Bungkus foto dengan div text-center supaya gambar rata tengah */}
        <div className="text-center  p-4">
          <img
            src="/images/user.png"
            alt="User Profile"
            className="mask mask-circle w-28 inline-block"
          />
        </div>

        {/* Kotak konten dengan rounded kiri atas besar */}
        <div className="w-full bg-base-100 rounded-tl-[120px] p-6 shadow-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          laudantium natus, est provident vero quo tempore quasi! Velit,
          doloribus quisquam vero minus fugit possimus aspernatur assumenda
          praesentium cum molestias. Natus, accusantium! Minima ratione sit,
          maiores dicta laudantium mollitia in quisquam ex! Deleniti ea
          architecto voluptatem molestiae odit eveniet minima reiciendis
          adipisci aliquid delectus aut dicta, repellendus laudantium eius
          tempore quis quod fuga iure nobis vero magnam. Nisi nam odio
          voluptatibus laudantium, consequuntur asperiores quaerat temporibus
          excepturi quia molestias doloremque labore minus laborum numquam!
          Dolores, aliquam ipsam. Consequatur adipisci eligendi quo libero esse
          vero non eius in voluptates sed? A, sint.
        </div>
      </div>
    </div>
  );
}
// export default function ProfilePage() {
//   return (
//     <div className="h-full overflow-y-auto lg:h-auto w-full bg-blue-200/80">
//       <div className="relative max-w-xl mx-auto">
//         {/* Bungkus foto dengan div text-center supaya gambar rata tengah */}
//         <div className="text-center  p-4">
//           <img
//             src="/images/user.png"
//             alt="User Profile"
//             className="mask mask-circle w-28 inline-block"
//           />
//         </div>

//         {/* Kotak konten dengan rounded kiri atas besar */}
//         <div className="w-full bg-base-100 rounded-tl-[120px] p-6 shadow-md">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
//           laudantium natus, est provident vero quo tempore quasi! Velit,
//           doloribus quisquam vero minus fugit possimus aspernatur assumenda
//           praesentium cum molestias. Natus, accusantium! Minima ratione sit,
//           maiores dicta laudantium mollitia in quisquam ex! Deleniti ea
//           architecto voluptatem molestiae odit eveniet minima reiciendis
//           adipisci aliquid delectus aut dicta, repellendus laudantium eius
//           tempore quis quod fuga iure nobis vero magnam. Nisi nam odio
//           voluptatibus laudantium, consequuntur asperiores quaerat temporibus
//           excepturi quia molestias doloremque labore minus laborum numquam!
//           Dolores, aliquam ipsam. Consequatur adipisci eligendi quo libero esse
//           vero non eius in voluptates sed? A, sint.
//         </div>
//       </div>
//     </div>
//   );
// }
