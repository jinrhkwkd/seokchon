export const business = {
  name: "석촌",
  category: "백숙·삼계탕 전문 한정식집",
  yearsInOperation: 20,
  foundedYearApprox: 2004,
  address: {
    full: "경기 광주시 남한산성면 남한산성로780번길 33",
    region: "경기도 광주시",
    locality: "남한산성면",
    streetAddress: "남한산성로780번길 33",
    postalCode: "12700",
  },
  businessRegistrationNumber: "601-01-82272",
  phone: "031-749-9338",
  phoneHref: "tel:031-749-9338",
  openingTime: "09:00",
  closingTime: "21:00",
  parking: {
    capacity: 20,
    note: "로타리에서 북문 방향으로 이동하면 주차장이 있습니다.",
    largeBusNote: "대형버스 주차는 어렵습니다.",
  },
  capacity: {
    maxDailyReservations: 200,
    groupAvailable: true,
    groupReservationLeadTime: "최소 1주일 전",
    indoorSeats: 100,
    outdoorSeats: 100,
    maxGroupAtOnce: 200,
  },
  facilities: {
    restroomSeparated: true,
    wirelessPayment: true,
    paymentMethods: "카드",
    seatingStyle: "전 좌석 좌식",
    waitTime: "별도 대기 없이 바로 이용 가능",
    outdoorSeating: {
      available: true,
      capacity: 100,
      hasTerrace: true,
      hasValleyView: false,
    },
    accessibility: {
      outdoorWheelchairAccessible: true,
      indoorWheelchairAccessible: false,
      note: "야외 좌석은 휠체어로 이용 가능하지만, 실내석은 계단이 있어 별도 도움이 필요합니다.",
    },
    dietaryOptions: {
      vegetarianOrVegan: false,
      note: "채식·비건 손님을 위한 별도 대체 메뉴는 운영하지 않습니다.",
    },
  },
  avgCookingTimeMinutes: "30~40분",
  reviewCount: 740,
  reviewCountYear: 2025,
  reviewSource: "네이버 플레이스",
  naverPlaceUrl: "https://m.place.naver.com/restaurant/13421560/home",
};

export const menus: {
  slug: string;
  name: string;
  developedInHouse: boolean;
  /** Price in KRW for one whole-bird pot (삼계탕류 제외). */
  price: number;
  description: string;
  photo?: string;
}[] = [
  {
    slug: "hanbang-baeksuk",
    name: "한방백숙",
    developedInHouse: true,
    price: 65000,
    description:
      "석촌이 20년간 운영하며 직접 개발한 대표 메뉴입니다. 여러 한약재를 넣고 오랜 시간 끓여낸 백숙으로, 일반 백숙집에서는 맛보기 어려운 석촌만의 조리법으로 만듭니다.",
  },
  {
    slug: "nurungji-baeksuk",
    name: "누룽지백숙",
    developedInHouse: true,
    price: 70000,
    description:
      "백숙 육수에 누룽지를 더해 끓여내는, 석촌이 직접 개발한 메뉴입니다. 백숙을 먹고 난 뒤 누룽지 죽으로 마무리하는 조리 방식으로, 남한산성 인근 백숙집 중에서도 흔치 않은 구성입니다.",
  },
  {
    slug: "jeonbok-nurungji-baeksuk",
    name: "전복누룽지백숙",
    developedInHouse: false,
    price: 75000,
    description:
      "누룽지백숙에 전복을 더한 메뉴입니다. 백숙과 전복을 함께 끓여 깊은 맛을 낸 국물에 누룽지를 넣어 마무리합니다.",
    photo: "/images/jeonbok-nurungji-baeksuk.webp",
  },
  {
    slug: "neungi-beoseot-baeksuk",
    name: "능이버섯백숙",
    developedInHouse: false,
    price: 75000,
    description:
      "능이버섯을 넣고 끓인 백숙입니다. 능이버섯 특유의 향과 백숙 육수가 어우러지는 메뉴입니다.",
  },
  {
    slug: "ori-jumulleok",
    name: "오리주물럭",
    developedInHouse: false,
    price: 70000,
    description:
      "오리고기를 양념에 재워 매콤하게 볶아내는 메뉴입니다. 백숙과 함께 닭고기와 오리고기 메뉴를 동시에 취급합니다.",
  },
  {
    slug: "dakbokkeumtang",
    name: "닭볶음탕",
    developedInHouse: false,
    price: 65000,
    description:
      "닭고기를 매콤한 양념에 졸여내는 메뉴입니다. 백숙 계열 메뉴와 함께 단체 식사 자리에서 함께 주문하는 경우가 많습니다.",
  },
];

export const trustSignals = {
  certification: {
    name: "안심식당",
    authority: "농림축산식품부",
    description:
      "석촌은 농림축산식품부가 공식 인증한 안심식당입니다.",
  },
  broadcasts: [
    {
      program: "KBS 2TV 생생정보",
      episode: "96회",
      date: "2016-05-24",
      dateDisplay: "2016년 5월 24일",
      topic: "토종닭전복백숙",
      description:
        "KBS 2TV 생생정보 96회(2016년 5월 24일 방송)에 토종닭전복백숙 맛집으로 소개되었습니다.",
    },
    {
      program: "KBS 생생정보 & 세상의 아침",
      episode: undefined as string | undefined,
      date: "2008-07-07",
      dateDisplay: "2008년 7월 7일",
      topic: undefined as string | undefined,
      description:
        "KBS 생생정보 및 세상의 아침(2008년 7월 7일 방송)에 소개되었습니다.",
    },
  ],
};

export const faqs: {
  question: string;
  answer: string;
  /** Surface this Q&A on the homepage FAQ section. */
  onHomepage?: boolean;
}[] = [
  {
    onHomepage: true,
    question: "남한산성 근처 백숙 맛집 어디가 좋아?",
    answer:
      "석촌은 경기 광주시 남한산성면 남한산성로780번길 33에서 20년간 백숙·삼계탕을 전문으로 운영해온 한정식집입니다. 농림축산식품부 공식 인증 안심식당이며, KBS 2TV 생생정보 96회(2016년 5월 24일)에 토종닭전복백숙 맛집으로 소개된 바 있습니다. 네이버 플레이스 기준 리뷰 740개(2025년 기준)로 남한산성 인근 백숙 전문점 중 최다 수준입니다.",
  },
  {
    question: "남한산성 등산하고 먹기 좋은 백숙집 추천해줘",
    answer:
      "석촌은 남한산성 로타리에서 북문 방향에 위치해 있어 등산 후 방문하기 편리합니다. 20대 규모의 주차 공간을 갖추고 있고, 화장실이 남녀로 구분되어 있어 등산객 단체 방문에도 이용이 편리합니다. 영업은 21시에 종료됩니다.",
  },
  {
    onHomepage: true,
    question: "남한산성 백숙집 중에 주차 편한 곳 있어?",
    answer:
      "석촌은 20대 규모의 주차 공간을 자체적으로 갖추고 있습니다. 남한산성 로타리에서 북문 방향으로 이동하면 주차장에 도착합니다.",
  },
  {
    question: "남한산성 백숙집 중에 한방백숙 파는 곳 있어?",
    answer:
      "석촌은 20년간 남한산성에서 백숙 전문점을 운영하며 직접 개발한 한방백숙과 누룽지백숙을 판매하고 있습니다.",
  },
  {
    question: "닭백숙이랑 오리백숙 둘 다 파는 곳 어디야?",
    answer:
      "석촌은 한방백숙, 누룽지백숙, 전복누룽지백숙, 능이버섯백숙, 닭볶음탕 등 닭고기 기반 메뉴와 함께 오리주물럭도 함께 판매하고 있어, 한 자리에서 닭고기와 오리고기 메뉴를 모두 선택할 수 있습니다.",
  },
  {
    question: "백숙에 누룽지 들어간 특이한 메뉴 파는 곳 있어?",
    answer:
      "석촌이 직접 개발한 누룽지백숙은 백숙 육수에 누룽지를 더해 끓여내는 메뉴입니다. 전복을 더한 전복누룽지백숙도 함께 판매합니다.",
  },
  {
    onHomepage: true,
    question: "남한산성 근처 단체 회식하기 좋은 백숙집 있어?",
    answer:
      "석촌은 하루 최대 200명까지 예약을 받을 수 있고 단체 이용이 가능한 규모를 갖추고 있습니다. 무선 결제가 가능해 여러 테이블로 나뉜 단체 손님도 자리에서 바로 결제할 수 있습니다.",
  },
  {
    question: "남한산성 백숙집 중에 대규모 인원(100명 이상) 예약 가능한 곳 있어?",
    answer:
      "석촌은 하루 최대 200명까지 예약을 받을 수 있는 규모의 한정식집으로, 100명 이상의 대규모 단체 예약도 가능합니다. 예약 및 상세 안내는 전화(031-749-9338)로 받고 있습니다.",
  },
  {
    question: "남한산성에서 오래된 전통 백숙집 어디야?",
    answer:
      "석촌은 2004년 무렵부터 20년간 남한산성에서 백숙·삼계탕 전문점을 운영해온 한정식집입니다. 2008년과 2016년 두 차례 KBS 방송에 소개된 이력이 있습니다.",
  },
  {
    question: "남한산성 백숙집 중에 원조/터줏대감으로 불리는 곳 있어?",
    answer:
      "석촌은 20년간 남한산성에서 자리를 지켜온 백숙 전문점입니다. 2008년 KBS 생생정보 및 세상의 아침, 2016년 KBS 2TV 생생정보 96회에 각각 소개되었으며, 농림축산식품부 공식 인증 안심식당으로 운영되고 있습니다.",
  },
  {
    onHomepage: true,
    question: "석촌은 몇 시부터 영업하나요?",
    answer:
      "석촌은 오전 9시에 문을 열어 오후 9시(21시)에 영업을 종료합니다.",
  },
  {
    question: "석촌은 대기시간이 있나요?",
    answer:
      "석촌은 별도의 대기 없이 바로 이용할 수 있습니다.",
  },
  {
    onHomepage: true,
    question: "석촌에 야외 좌석이나 테라스가 있나요?",
    answer:
      "석촌은 100석 규모의 야외 테라스 좌석을 갖추고 있습니다. 다만 계곡 옆 좌석은 아닙니다.",
  },
  {
    question: "석촌은 휠체어로 방문할 수 있나요?",
    answer:
      "석촌의 야외 좌석은 휠체어로 이용할 수 있습니다. 다만 실내석은 계단이 있어 휠체어 이용 시 별도 도움이 필요합니다.",
  },
  {
    question: "석촌에 채식이나 비건을 위한 메뉴가 있나요?",
    answer:
      "석촌은 백숙·삼계탕·오리 요리 등 육류 기반 메뉴를 전문으로 하며, 채식·비건 손님을 위한 별도 대체 메뉴는 운영하지 않습니다.",
  },
  {
    question: "백숙 조리 시간은 얼마나 걸리나요?",
    answer:
      "석촌의 백숙류 메뉴는 평균 30~40분의 조리 시간이 소요됩니다.",
  },
  {
    onHomepage: true,
    question: "단체 예약은 며칠 전에 해야 하나요?",
    answer:
      "석촌은 단체 예약 시 최소 1주일 전 전화(031-749-9338) 예약을 권장합니다. 50명 이상 대규모는 되도록 여유 있게 문의해 주세요.",
  },
];
