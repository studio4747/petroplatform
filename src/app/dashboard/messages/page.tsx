// app/dashboard/messages/page.tsx
import { getCurrentUser } from "@/lib/auth";
import pb  from "@/lib/pocketbase"; // فرض بر اینه که PocketBase client اینجا ساخته شده
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  created: string;
}

export default async function MessagesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <p>لطفاً ابتدا وارد شوید.</p>;
  }

  // واکشی پیام‌ها از PocketBase
  const allMessages = await pb.collection("messages").getFullList<Message>(200, {
    sort: "-created",
  });

  // فیلتر کردن پیام‌ها بر اساس کاربر لاگین شده
  const userMessages = allMessages.filter(
    (msg) => msg.sender === user.id || msg.recipient === user.id
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">پیام‌ها</h1>

      {userMessages.length === 0 ? (
        <p>هیچ پیامی برای نمایش وجود ندارد.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userMessages.map((msg) => (
            <Card key={msg.id} className="p-4 hover:shadow-lg transition-all">
              <p className="text-gray-700 mb-2">{msg.content}</p>
              <p className="text-sm text-gray-400">
                فرستنده: {msg.sender} | گیرنده: {msg.recipient}
              </p>
              <p className="text-xs text-gray-500 mt-1">{new Date(msg.created).toLocaleString("fa-IR")}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
