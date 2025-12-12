import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { sessions } from '@/lib/mockData';
import { ArrowUpDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type SortField = 'startTime' | 'activityName' | 'correctCount' | 'wrongCount' | 'duration';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function Sessions() {
  const [sortField, setSortField] = useState<SortField>('startTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'startTime':
          comparison = a.startTime.getTime() - b.startTime.getTime();
          break;
        case 'activityName':
          comparison = a.activityName.localeCompare(b.activityName);
          break;
        case 'correctCount':
          comparison = a.correctCount - b.correctCount;
          break;
        case 'wrongCount':
          comparison = a.wrongCount - b.wrongCount;
          break;
        case 'duration':
          const durationA = a.endTime.getTime() - a.startTime.getTime();
          const durationB = b.endTime.getTime() - b.startTime.getTime();
          comparison = durationA - durationB;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sortField, sortDirection]);

  const totalPages = Math.ceil(sortedSessions.length / ITEMS_PER_PAGE);
  const paginatedSessions = sortedSessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  };

  const getAccuracy = (correct: number, wrong: number) => {
    const total = correct + wrong;
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead>
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-1 -ml-3 font-medium"
        onClick={() => handleSort(field)}
      >
        {children}
        <ArrowUpDown className={cn(
          "h-4 w-4",
          sortField === field && "text-primary"
        )} />
      </Button>
    </TableHead>
  );

  return (
    <Layout breadcrumbs={[{ name: 'Sessions' }]}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Study Sessions</h1>
          <p className="mt-1 text-muted-foreground">
            {sessions.length} total sessions
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <SortHeader field="startTime">Date</SortHeader>
                <SortHeader field="activityName">Activity</SortHeader>
                <TableHead>Group</TableHead>
                <SortHeader field="duration">Duration</SortHeader>
                <SortHeader field="correctCount">Correct</SortHeader>
                <SortHeader field="wrongCount">Wrong</SortHeader>
                <TableHead>Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSessions.map((session) => {
                const accuracy = getAccuracy(session.correctCount, session.wrongCount);
                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {format(session.startTime, 'MMM d, yyyy')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(session.startTime, 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/activities/${session.activityId}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {session.activityName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {session.groupName ? (
                        <Link 
                          to={`/groups/${session.groupId}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {session.groupName}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">All words</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDuration(session.startTime, session.endTime)}
                    </TableCell>
                    <TableCell className="text-success font-medium">
                      {session.correctCount}
                    </TableCell>
                    <TableCell className="text-destructive font-medium">
                      {session.wrongCount}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={accuracy >= 80 ? 'default' : accuracy >= 60 ? 'secondary' : 'destructive'}
                        className={cn(
                          accuracy >= 80 && 'bg-success hover:bg-success/90'
                        )}
                      >
                        {accuracy}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, sortedSessions.length)} of{' '}
              {sortedSessions.length} sessions
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
