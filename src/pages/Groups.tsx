import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { wordGroups, getWordsByGroup } from '@/lib/mockData';
import { FolderOpen, ArrowRight, BookOpen } from 'lucide-react';

export default function Groups() {
  return (
    <Layout breadcrumbs={[{ name: 'Groups' }]}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Word Groups</h1>
          <p className="mt-1 text-muted-foreground">
            Organize and study vocabulary by topic
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wordGroups.map((group) => {
            const groupWords = getWordsByGroup(group.id);
            const totalCorrect = groupWords.reduce((sum, w) => sum + w.correctCount, 0);
            const totalAttempts = totalCorrect + groupWords.reduce((sum, w) => sum + w.wrongCount, 0);
            const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

            return (
              <Card key={group.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {group.wordCount} words
                    </span>
                  </div>
                  <CardTitle className="mt-3">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Accuracy: <span className="font-medium text-foreground">{accuracy}%</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/groups/${group.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <BookOpen className="h-4 w-4" />
                        View Words
                      </Button>
                    </Link>
                    <Link to={`/activities/flashcard?group=${group.id}`}>
                      <Button size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
