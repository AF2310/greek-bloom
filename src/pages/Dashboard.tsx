import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Library, 
  History, 
  TrendingUp, 
  Target, 
  Clock,
  ArrowRight,
  Layers,
  CircleDot,
  Keyboard,
  Link2,
  Headphones,
  PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { words, studyActivities, wordGroups } from '@/lib/mockData';
import { getUserSessions, getUserStats, getUserWordProgress, StudySession } from '@/lib/studyService';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({ totalSessions: 0, totalCorrect: 0, totalWrong: 0, accuracy: 0 });
  const [lastSession, setLastSession] = useState<StudySession | null>(null);
  const [wordProgress, setWordProgress] = useState<{ mastered: number }>({ mastered: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, sessions, progress] = await Promise.all([
        getUserStats(),
        getUserSessions(),
        getUserWordProgress()
      ]);
      
      setStats(statsData);
      setLastSession(sessions.find(s => s.completed_at) || null);
      
      // Count mastered words (10+ correct, 2 or fewer wrong)
      const masteredCount = progress.filter(p => p.correct_count >= 10 && p.wrong_count <= 2).length;
      setWordProgress({ mastered: masteredCount });
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalWords = words.length;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return Layers;
      case 'quiz': return CircleDot;
      case 'typing': return Keyboard;
      case 'matching': return Link2;
      case 'listening': return Headphones;
      case 'spelling': return PenTool;
      default: return BookOpen;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greek: 'καλημέρα!', english: 'Good morning' };
    if (hour < 18) return { greek: 'χαῖρε!', english: 'Hello' };
    return { greek: 'καλησπέρα!', english: 'Good evening' };
  };

  const greeting = getGreeting();

  return (
    <Layout breadcrumbs={[{ name: 'Dashboard' }]}>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground">
            {greeting.greek}{' '}
            <span className="text-muted-foreground font-sans text-2xl font-normal">
              {greeting.english}, {profile?.username || 'Scholar'}!
            </span>
          </h1>
          <p className="mt-2 text-muted-foreground">Continue your journey through Ancient Greek.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Words</CardTitle>
              <Library className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalWords}</div>
              <p className="text-xs text-muted-foreground">in your vocabulary</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mastered</CardTitle>
              <Target className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {loading ? '-' : wordProgress.mastered}
              </div>
              <p className="text-xs text-muted-foreground">words mastered</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
              <TrendingUp className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {loading ? '-' : `${stats.accuracy}%`}
              </div>
              <p className="text-xs text-muted-foreground">overall accuracy</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
              <History className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {loading ? '-' : stats.totalSessions}
              </div>
              <p className="text-xs text-muted-foreground">study sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Last Session */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Last Session
              </CardTitle>
              <CardDescription>Your most recent study activity</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : lastSession ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="font-medium text-foreground">{lastSession.activity_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lastSession.group_name || 'All words'}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(lastSession.started_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-success">✓ {lastSession.correct_count} correct</span>
                    <span className="text-destructive">✗ {lastSession.wrong_count} wrong</span>
                  </div>
                  <Link to="/sessions">
                    <Button variant="outline" className="w-full">
                      View All Sessions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">No sessions yet. Start studying!</p>
                  <Link to="/activities">
                    <Button>Start Learning</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Study Activities
              </CardTitle>
              <CardDescription>Choose an activity to start learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {studyActivities.slice(0, 6).map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <Link 
                      key={activity.id} 
                      to={`/activities/${activity.id}`}
                      className="group"
                    >
                      <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-md group-hover:-translate-y-1">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">{activity.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {activity.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Word Groups Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Word Groups</CardTitle>
              <CardDescription>Organize your vocabulary by topic</CardDescription>
            </div>
            <Link to="/groups">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wordGroups.slice(0, 6).map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary hover:bg-muted/50">
                    <h4 className="font-medium text-foreground">{group.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{group.wordCount} words</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
