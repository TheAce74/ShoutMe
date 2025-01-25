"use client";

import { format } from "date-fns";
import Image from "next/image";

const notifications = [
  {
    title: "Testing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis doloremque fugit eligendi numquam veniam hic animi, amet maxime nobis natus ab incidunt reiciendis sapiente fuga voluptatibus aliquam minus iste suscipit molestias recusandae quas quos esse libero? Voluptate, quam. Non deleniti minima iure nisi architecto? Praesentium minima veniam, nesciunt saepe cupiditate odio libero accusamus illum sunt, dignissimos atque minus animi.",
    createdAt: new Date(),
  },
  {
    title: "Testing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis doloremque fugit eligendi numquam veniam hic animi, amet maxime nobis natus ab incidunt reiciendis sapiente fuga voluptatibus aliquam minus iste suscipit molestias recusandae quas quos esse libero? Voluptate, quam. Non deleniti minima iure nisi architecto? Praesentium minima veniam, nesciunt saepe cupiditate odio libero accusamus illum sunt, dignissimos atque minus animi.",
    createdAt: new Date(),
  },
  {
    title: "Testing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis doloremque fugit eligendi numquam veniam hic animi, amet maxime nobis natus ab incidunt reiciendis sapiente fuga voluptatibus aliquam minus iste suscipit molestias recusandae quas quos esse libero? Voluptate, quam. Non deleniti minima iure nisi architecto? Praesentium minima veniam, nesciunt saepe cupiditate odio libero accusamus illum sunt, dignissimos atque minus animi.",
    createdAt: new Date(),
  },
  {
    title: "Testing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis doloremque fugit eligendi numquam veniam hic animi, amet maxime nobis natus ab incidunt reiciendis sapiente fuga voluptatibus aliquam minus iste suscipit molestias recusandae quas quos esse libero? Voluptate, quam. Non deleniti minima iure nisi architecto? Praesentium minima veniam, nesciunt saepe cupiditate odio libero accusamus illum sunt, dignissimos atque minus animi.",
    createdAt: new Date(),
  },
];

export default function Notifications() {
  return (
    <div>
      {notifications.length === 0 ? (
        <div className="grid min-h-[70dvh] place-content-center place-items-center gap-2 text-center">
          <Image
            src="/images/notifications.png"
            alt="Empty illustration"
            width={749}
            height={635}
            className="mx-auto mb-3 h-auto w-[157px] lg:w-[380px]"
          />
          <h2 className="text-xl font-bold text-primary-400 lg:text-2xl">
            You have no notifications
          </h2>
          <p>Your notifications will appear here when they arrive.</p>
        </div>
      ) : (
        <ul>
          {notifications.map((notification, idx) => (
            <li
              key={notification.title + idx}
              className="mb-4 space-y-1 border-b border-neutral-200 pb-4"
            >
              <h3 className="text-lg font-semibold text-primary-400 lg:text-xl">
                {notification.title}
              </h3>
              <p>{notification.description}</p>
              <p className="font-medium italic">
                {format(notification.createdAt, "Pp")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
