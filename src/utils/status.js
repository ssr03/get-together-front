export default function status(status) {
  if (status === 1) return "모집중";
  else if (status === 2) return "모집완료";
  else if (status === 3) return "스터디 진행";
  return "기타";
}
