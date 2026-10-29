import type { ImageSourcePropType } from "react-native";

export type Sight = {
  id: string;
  title: string;
  category: string;
  categoryId: "architecture" | "museums" | "parks";
  image: ImageSourcePropType;
  description: string;
  address: string;
  openingHours: string;
  tip: string;
};

// Данные используются и в списке, и на экране подробной карточки.
export const sights: Sight[] = [
  {
    id: "minsk-town-hall",
    title: "Минская городская ратуша",
    category: "Архитектура · исторический центр",
    categoryId: "architecture",
    image: require("../assets/town-hall.png"),
    description:
      "Белоснежная ратуша на площади Свободы - символ восстановленного исторического центра Минска.",
    address: "пл. Свободы, 2а, Минск",
    openingHours: "осмотр снаружи - круглосуточно",
    tip: "Зайдите сюда утром, когда площадь ещё не заполнена людьми.",
  },
  {
    id: "national-library",
    title: "Национальная библиотека Беларуси",
    category: "Современная архитектура · Минск",
    categoryId: "architecture",
    image: require("../assets/town-hall.png"),
    description:
      "Знаменитое здание в форме ромбокубооктаэдра с обзорной площадкой и вечерней подсветкой.",
    address: "пр-т Независимости, 116, Минск",
    openingHours: "по расписанию библиотеки",
    tip: "Поднимитесь на обзорную площадку, чтобы увидеть город с высоты.",
  },
  {
    id: "mir-castle",
    title: "Мирский замок",
    category: "Музеи · Гродненская область",
    categoryId: "museums",
    image: require("../assets/town-hall.png"),
    description:
      "Замковый комплекс XVI века с башнями, внутренним двором и прогулочной зоной у пруда.",
    address: "ул. Красноармейская, 2, г.п. Мир",
    openingHours: "по расписанию музейного комплекса",
    tip: "На прогулку по территории лучше выделить не меньше двух часов.",
  },
  {
    id: "brest-fortress",
    title: "Брестская крепость",
    category: "Музеи · Брест",
    categoryId: "museums",
    image: require("../assets/town-hall.png"),
    description:
      "Мемориальный комплекс на месте героической обороны Брестской крепости в 1941 году.",
    address: "ул. Героев Обороны Брестской крепости, 60, Брест",
    openingHours: "территория открыта ежедневно",
    tip: "Возьмите удобную обувь: территория комплекса очень большая.",
  },
  {
    id: "belovezhskaya-pushcha",
    title: "Национальный парк «Беловежская пуща»",
    category: "Парки · Брестская область",
    categoryId: "parks",
    image: require("../assets/town-hall.png"),
    description:
      "Один из старейших лесных массивов Европы с экологическими тропами и природными маршрутами.",
    address: "аг. Каменюки, Каменецкий район",
    openingHours: "по расписанию национального парка",
    tip: "Для прогулки по маршрутам выберите удобную обувь и одежду по погоде.",
  },
];
