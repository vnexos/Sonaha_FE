"use client";

import Carousel from "@/components/common/carousel";
import SidebarNav from "@/components/common/SidebarNav";
import { useGetBannerQuery } from "@/store/queries/banners";

function HomePage() {
  const { banners } = useGetBannerQuery(null, {
    selectFromResult: (result) => ({
      banners: result.data,
    }),
  });

  return (
    <div className="">
      <Carousel
        images={
          banners
            ? banners.map((banner: any) => ({
                id: banner.banner_id,
                url: banner.image_url,
                fallbackUrl: banner.image_url, // Bạn có thể sử dụng cùng một URL hoặc thêm fallback URL nếu cần
                des: banner.title, // Giữ lại thuộc tính name
              }))
            : []
        }
      />
      <div className=" pt-10 flex flex-row m-auto container">
        <div className="w-[18%]">
          <SidebarNav />
        </div>

        <div className="w-[80%]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at arcu
            vestibulum, blandit est eu, auctor quam. Suspendisse scelerisque
            volutpat arcu ut commodo. Suspendisse eu turpis vitae justo
            sollicitudin fermentum. Donec laoreet arcu elit, at tempus nulla
            rutrum quis. Praesent tortor nibh, bibendum in auctor in, pharetra
            consequat libero. Vestibulum est lacus, convallis non feugiat quis,
            lobortis nec nulla. Nunc efficitur in sem sit amet consectetur.
            Aliquam accumsan fringilla orci, eu hendrerit urna efficitur sit
            amet. Cras vitae iaculis odio. Suspendisse faucibus, velit ac
            viverra sagittis, lacus justo lobortis mi, quis interdum tortor elit
            a quam. Suspendisse tristique vel metus quis convallis. Aenean
            sollicitudin odio risus, ut dignissim dolor facilisis eu. Maecenas
            porta commodo nisi, in pellentesque mauris mollis vitae. Sed
            lobortis accumsan arcu, quis mollis tellus interdum aliquam.
            Curabitur sed quam dignissim, sollicitudin dui vitae, mattis nisi.
            Nunc in nibh non elit tristique ultrices. Etiam laoreet lorem sed ex
            mollis pharetra. Phasellus volutpat ex id sem tempor sodales.
            Pellentesque orci orci, convallis ut ligula at, ultrices facilisis
            purus. Sed efficitur quam congue, tincidunt nibh nec, dictum magna.
            Nullam suscipit libero diam, eu auctor mauris euismod in. Mauris
            tempor finibus felis quis tempus. Ut sit amet pharetra nisl. Fusce
            eget nunc at ipsum bibendum vestibulum. Vivamus id vehicula lorem.
            Ut pretium enim eu metus sagittis, ut cursus ligula dignissim.
            Suspendisse sed odio id ligula pulvinar mollis nec quis arcu. Morbi
            massa enim, vehicula id urna in, rutrum tempor arcu. Ut urna justo,
            faucibus non cursus non, pellentesque molestie libero. Aenean
            fermentum mauris vitae nulla pharetra sodales. Integer quis urna
            quis metus pellentesque convallis vitae ut diam. Suspendisse
            potenti. Mauris hendrerit orci ante, ut fermentum ligula bibendum
            ac. Maecenas at risus a ligula pulvinar lacinia. Morbi elit ipsum,
            dictum ut risus et, porttitor porta mi. Vestibulum in ex quis sapien
            volutpat mattis. Praesent aliquet tincidunt turpis, et ultricies
            justo ultrices sit amet. Cras facilisis sem ultricies sem dignissim,
            ac tincidunt ipsum tincidunt. Curabitur eu erat volutpat, convallis
            lacus eu, tempor lorem. In hac habitasse platea dictumst. Nam
            sollicitudin, mi vel posuere maximus, purus ex congue tortor, ac
            pretium velit tellus vitae quam. Aliquam nec ligula dolor. Donec at
            purus neque. Proin efficitur massa eu sem eleifend venenatis. Aenean
            id tincidunt quam, tincidunt bibendum neque. Curabitur dignissim
            bibendum libero, eu hendrerit ex blandit condimentum. Donec cursus
            est ac felis lacinia pellentesque. Suspendisse vitae consequat
            justo, eget rhoncus tellus. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Mauris blandit
            mattis leo, at ullamcorper dolor facilisis vitae. Etiam consequat,
            risus ac accumsan ullamcorper, tellus nisi feugiat libero, et
            faucibus mauris risus ut tortor. Suspendisse rhoncus blandit massa,
            molestie porttitor enim mollis ut. Nulla venenatis ligula ut
            pellentesque lobortis. Quisque felis purus, tincidunt quis
            vestibulum nec, accumsan sed purus. Fusce neque nunc, aliquam
            hendrerit scelerisque ut, varius eu sem. Cras posuere lorem nec
            tempus dignissim. Sed nisi lectus, elementum sed blandit in,
            dignissim non neque. Curabitur vitae pretium mi. Sed lobortis vel
            augue et malesuada. Vestibulum gravida in nisi ut aliquam. Nulla ut
            libero pharetra, aliquet sapien sed, maximus massa.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
