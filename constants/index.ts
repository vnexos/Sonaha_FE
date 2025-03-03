export const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const enum type_properties_typePropertiesName {
   Apartment = "Căn hộ",
   OfficeBuilding = "Tòa nhà văn phòng",
   ShoppingCenter = "Trung tâm mua sắm",
   NewUrbanArea = "Khu đô thị mới",
   MixedUseDevelopment = "Phát triển đa chức năng",
   SocialHousing = "Nhà ở xã hội",
   EcoResort = "Khu nghỉ dưỡng sinh thái",
   IndustrialPark = "Khu công nghiệp",
   SemiDetachedVilla = "Biệt thự song lập",
   Shophouse = "Nhà phố thương mại",
   Townhouse = "Nhà phố",
   OtherProject = "Dự án khác",
   BeachLand = "Đất ven biển",
   PerennialCropLand = "Đất trồng cây lâu năm",
   Villa = "Biệt thự",
   ResidentialPlot = "Đất ở",
   StreetHouse = "Nhà mặt phố",
   LuxuryApartment = "Căn hộ cao cấp",
 }
 
 export const projectMenuItems = [
   {
     label: type_properties_typePropertiesName.Apartment,
     href: "Apartment",
   },
   {
     label: type_properties_typePropertiesName.OfficeBuilding,
     href: "OfficeBuilding",
   },
   {
     label: type_properties_typePropertiesName.ShoppingCenter,
     href: "ShoppingCenter",
   },
   {
     label: type_properties_typePropertiesName.NewUrbanArea,
     href: "NewUrbanArea",
   },
   {
     label: type_properties_typePropertiesName.MixedUseDevelopment,
     href: "MixedUseDevelopment",
   },
   {
     label: type_properties_typePropertiesName.SocialHousing,
     href: "SocialHousing",
   },
   {
     label: type_properties_typePropertiesName.EcoResort,
     href: "EcoResort",
   },
   {
     label: type_properties_typePropertiesName.IndustrialPark,
     href: "IndustrialPark",
   },
   {
     label: type_properties_typePropertiesName.SemiDetachedVilla,
     href: "SemiDetachedVilla",
   },
   {
     label: type_properties_typePropertiesName.Shophouse,
     href: "Shophouse",
   },
   {
     label: type_properties_typePropertiesName.Townhouse,
     href: "Townhouse",
   },
   {
     label: type_properties_typePropertiesName.OtherProject,
     href: "OtherProject",
   },
   {
     label: type_properties_typePropertiesName.BeachLand,
     href: "BeachLand",
   },
   {
     label: type_properties_typePropertiesName.PerennialCropLand,
     href: "PerennialCropLand",
   },
   { label: type_properties_typePropertiesName.Villa, href: "Villa" },
   {
     label: type_properties_typePropertiesName.ResidentialPlot,
     href: "ResidentialPlot",
   },
   {
     label: type_properties_typePropertiesName.StreetHouse,
     href: "StreetHouse",
   },
   {
     label: type_properties_typePropertiesName.LuxuryApartment,
     href: "LuxuryApartment",
   },
 ];