import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function ProfilePage() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Profile</EmptyTitle>
        <EmptyDescription>Coming soon</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
