import { GlassCard } from "@/components/ui";
import { DAY_LABELS, DAYS } from "@/lib/data";
import type { DayOfWeek, HoursTableProps } from "@/lib/types";

function isClosedDay(hours: string): boolean {
  return hours.toLowerCase() === "closed";
}

export function HoursTable({ hours, todayDay }: HoursTableProps) {
  return (
    <section aria-labelledby="hours-heading" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="p-5 sm:p-6">
          <h2
            id="hours-heading"
            className="font-serif text-2xl text-espresso"
          >
            Opening hours
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Walk-ins welcome. Kitchen closes 30 minutes before closing time.
          </p>

          <table className="mt-5 w-full text-left text-sm">
            <caption className="sr-only">
              Weekly opening hours for Cardamom House
            </caption>
            <tbody>
              {DAYS.map((day: DayOfWeek) => {
                const dayHours = hours[day];
                const closed = isClosedDay(dayHours);
                const isToday = day === todayDay;

                return (
                  <tr
                    key={day}
                    className={`border-t border-stone-200/70 first:border-t-0 ${
                      isToday ? "bg-brand/5" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className={`py-3 pr-4 font-medium ${
                        isToday
                          ? "font-semibold text-brand-dark"
                          : closed
                            ? "text-stone-400"
                            : "text-stone-700"
                      }`}
                    >
                      {DAY_LABELS[day]}
                      {isToday ? (
                        <span className="ml-2 text-xs font-normal uppercase tracking-wide text-brand">
                          Today
                        </span>
                      ) : null}
                    </th>
                    <td
                      className={`py-3 tabular-nums ${
                        closed
                          ? "text-stone-400 italic"
                          : isToday
                            ? "font-semibold text-espresso"
                            : "text-stone-600"
                      }`}
                    >
                      {dayHours}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </section>
  );
}
