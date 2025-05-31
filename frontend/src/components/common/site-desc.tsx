import Image from "next/image";

export default function SiteDescription() {
  return (
    <div className="w-full md:w-2/5 p-6 flex flex-col gap-6">
      {/* Image */}
      <div className="relative w-full h-full aspect-video rounded-xl overflow-hidden shadow-md">
        <Image
          src="/banner.webp"
          alt="درباره ما"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Content */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-right">درباره ما</h1>
        <p className="text-base leading-relaxed text-right text-muted-foreground">
          ما در این وب‌سایت تلاش می‌کنیم مفاهیم پیچیدهٔ اقتصادی را به زبانی ساده
          و قابل‌درک برای همه توضیح دهیم. هدف ما افزایش سواد اقتصادی در جامعه
          است؛ چه تازه با این مفاهیم آشنا شده‌اید و چه به دنبال درک عمیق‌تری
          هستید، اینجا جای مناسبی برای شروع و رشد است.
        </p>
      </div>
    </div>
  );
}
