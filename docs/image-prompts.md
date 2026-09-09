# 석촌 홈페이지 — 이미지 생성 프롬프트 (플레이스홀더 3곳)

기존 이미지(`store-exterior.webp`, `jeonbok-nurungji-baeksuk.webp`)의 톤·색감·조명에 맞춘 포토리얼리스틱 프롬프트입니다.
공통 톤: 시골 백숙집의 자연광/텅스텐 조명, 매끈한 광고 스튜디오컷이 아닌 "깔끔한 폰카메라" 사실감, 따뜻한 갈색·황금색 국물·짙은 녹색 재료의 차분한 팔레트, 글자·손·사람 없음.

이미지를 만들면 아래 파일명으로 `public/images/` 에 저장해 주세요. 그러면 코드 연결 작업을 이어서 진행합니다.

| # | 위치 | 저장 파일명 | 비율 |
|---|------|-------------|------|
| ① | 메뉴 카드 "한방백숙" | `public/images/hanbang-baeksuk.webp` | 4:3 |
| ② | 메뉴 카드 "누룽지백숙" | `public/images/nurungji-baeksuk.webp` | 4:3 |
| ③ | 단체 예약 섹션 단체석 | `public/images/group-terrace.webp` (지금은 실제 매장 사진이 임시로 들어가 있음 — 생성 이미지로 교체를 원할 때만 덮어쓰기) | 3:2 |

---

## ① 한방백숙 클로즈업

```
Photorealistic close-up of Korean herbal whole-chicken baeksuk (한방백숙) served in a
black shallow steel pot on a deep-red portable butane burner, on a light wood table in a
rustic Korean countryside restaurant. One whole young chicken in clear pale-golden broth,
surrounded by dark oriental medicinal herbs — astragalus root, dried jujube, whole garlic
cloves, a ginseng root, peeled chestnuts — with a wedge of yellow pumpkin and chopped
green scallions on top, gentle steam rising. Warm tungsten indoor lighting, slightly warm
white balance, shallow depth of field with blurred wooden chairs and a stainless kettle in
the background. Shot from a 3/4 overhead angle. Natural, clean amateur phone-camera look —
not a glossy studio ad. Muted earthy palette: warm browns, soft gold broth, deep green
herbs. No text, no hands, no people. 4:3 aspect ratio.
```

## ② 누룽지백숙 클로즈업

```
Photorealistic close-up of Korean nurungji-baeksuk (누룽지백숙): whole-chicken baeksuk with
two large golden slabs of crispy scorched-rice crust (nurungji) standing upright in dark
savory broth inside a black shallow steel pot on a deep-red portable butane burner, on a
light wood table in a rustic Korean countryside restaurant. Whole chicken and glutinous
rice visible in the broth, a bundle of garlic chives and a wedge of yellow pumpkin between
the rice slabs, gentle steam. Warm tungsten indoor light, slightly warm white balance,
shallow depth of field, blurred wooden chairs behind. 3/4 overhead angle. Natural, clean
amateur phone-camera realism — not a glossy studio ad. Warm earthy brown-and-gold palette.
No text, no hands, no people. 4:3 aspect ratio.
```
> `jeonbok-nurungji-baeksuk.webp` 와 같은 구도에서 전복만 뺀 버전입니다. 두 사진이 나란히 놓여도 자연스럽게.

## ③ 야외 테라스 / 단체석 전경

```
Photorealistic wide interior view of a rustic Korean countryside restaurant's enclosed
sunroom group-dining terrace: long rows of solid wood tables with wooden chairs lined along
large white-framed windows, a weathered grey wood-plank floor, a curved green shade-net
ceiling, lush green trees and a tiled-roof hanok visible through the glass, soft natural
daylight under a lightly overcast sky. Empty, tidy, set for a large group. Natural, clean
amateur phone-camera look, slightly cool-neutral white balance. No people, no text. Muted
palette — warm wood browns, greenhouse green, off-white window frames, soft grey floor —
consistent with an exterior photo of the same restaurant. Eye-level angle looking down the
length of the tables. 3:2 aspect ratio.
```

---

### 참고 — 폴더에 이미 들어와 있는 실제 매장 사진 (미사용)
`실내1~5.png`, `야외1~2.png`, `주차장1.png`, `족구장1~2.png`, `메뉴판1~3.png`, `석촌 실내 단체회식(등산).png`.
③ 단체석 자리에는 그중 `야외1.png`(실제 테라스 단체석)을 webp로 변환해 임시로 넣어 두었습니다.
`석촌 실내 단체회식(등산).png` 는 실제 손님 얼굴이 나오므로, 사용하려면 초상권 확인이 필요합니다.
