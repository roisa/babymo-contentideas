import { Suspense } from "react";
import { CalendarClient } from "./calendar-client";

export default function CalendarPage() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">30-day content calendar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A balanced monthly plan. Mon = dua · Tue = parenting · Wed = fun fact · Thu = story · Fri = Jumuah · Sat = nostalgia · Sun = bedtime.
        </p>
      </div>
      <Suspense fallback={null}>
        <CalendarClient />
      </Suspense>
    </div>
  );
}
