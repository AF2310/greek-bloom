import { useState, useEffect, useMemo } from 'react';
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
import { getUserSessions, StudySession } from '@/lib/studyService';
import { ArrowUpDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type SortField = 'started_at' | 'activity_name' | 'correct_count' | 'wrong_count';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function Sessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('started_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await getUserSessions();
      setSessions(data);
      setLoading(false);
    };
    fetchSessions();
  }, []);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'started_at':
          comparison = new Date(a.started_at).getTime() - new Date(b.started_at).getTime();
          break;
        case 'activity_name':
          comparison = a.activity_name.localeCompare(b.activity_name);
          break;
        case 'correct_count':
          comparison = a.correct_count - b.correct_count;
          break;
        case 'wrong_count':
          comparison = a.wrong_count - b.wrong_count;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [sessions, sortField, sortDirection]);

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

  if (loading) {
    return (
      <Layout breadcrumbs={[{ name: 'Sessions' }]}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading sessions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout breadcrumbs={[{ name: 'Sessions' }]}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Study Sessions</h1>
          <p className="mt-1 text-muted-foreground">
            {sessions.length} total sessions
          </p>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No sessions yet</h3>
            <p className="text-muted-foreground mb-4">Start studying to see your progress here.</p>
            <Link to="/activities">
              <Button>Start Studying</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortHeader field="started_at">Date</SortHeader>
                    <SortHeader field="activity_name">Activity</SortHeader>
                    <TableHead>Group</TableHead>
                    <SortHeader field="correct_count">Correct</SortHeader>
                    <SortHeader field="wrong_count">Wrong</SortHeader>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSessions.map((session) => {
                    const accuracy = getAccuracy(session.correct_count, session.wrong_count);
                    const isCompleted = !!session.completed_at;
                    return (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">
                                {format(new Date(session.started_at), 'MMM d, yyyy')}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(session.started_at), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link 
                            to={`/activities/${session.activity_type}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {session.activity_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {session.group_name ? (
                            <Link 
                              to={`/groups/${session.group_id}`}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {session.group_name}
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">All words</span>
                          )}
                        </TableCell>
                        <TableCell className="text-success font-medium">
                          {session.correct_count}
                        </TableCell>
                        <TableCell className="text-destructive font-medium">
                          {session.wrong_count}
                        </TableCell>
                        <TableCell>
                          {isCompleted ? (
                            <Badge 
                              variant={accuracy >= 80 ? 'default' : accuracy >= 60 ? 'secondary' : 'destructive'}
                              className={cn(
                                accuracy >= 80 && 'bg-success hover:bg-success/90'
                              )}
                            >
                              {accuracy}%
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={isCompleted ? 'default' : 'secondary'}>
                            {isCompleted ? 'Completed' : 'In Progress'}
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
          </>
        )}
      </div>
    </Layout>
  );
}
