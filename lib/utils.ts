import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getPriorityColor(priority: string) {
  const colors: Record<string, string> = {
    URGENT: "text-red-500 bg-red-50 border-red-200",
    HIGH: "text-orange-500 bg-orange-50 border-orange-200",
    MEDIUM: "text-yellow-600 bg-yellow-50 border-yellow-200",
    LOW: "text-green-600 bg-green-50 border-green-200",
  };
  return colors[priority] || colors.MEDIUM;
}

export function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    BACKLOG: "text-gray-500 bg-gray-100",
    TODO: "text-blue-600 bg-blue-50",
    IN_PROGRESS: "text-indigo-600 bg-indigo-50",
    IN_REVIEW: "text-purple-600 bg-purple-50",
    DONE: "text-green-600 bg-green-50",
    CANCELLED: "text-red-500 bg-red-50",
  };
  return colors[status] || colors.TODO;
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
