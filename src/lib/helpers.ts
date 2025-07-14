export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function formatDate(originalDateString: string): string {
  const originalDate = new Date(originalDateString);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export function formatTime(originalDateString: string): string {
  const originalDate = new Date(originalDateString);
  const hours = String(originalDate.getHours()).padStart(2, "0");
  const minutes = String(originalDate.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDateTime(originalDateString: string): string {
  return `${formatDate(originalDateString)} ${formatTime(originalDateString)}`;
}
