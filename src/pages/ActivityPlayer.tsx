import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { words, getActivityById, wordGroups } from '@/lib/mockData';
import { sanitizeInput } from '@/lib/security';
import { ArrowLeft, RotateCcw, Check, X, ArrowRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityWord {
  id: string;
  greek: string;
  transliteration: string;
  english: string;
}

export default function ActivityPlayer() {
  const { activityId, groupId } = useParams();
  const navigate = useNavigate();
  const activity = getActivityById(activityId || '');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [activityWords, setActivityWords] = useState<ActivityWord[]>([]);

  useEffect(() => {
    let filteredWords = groupId 
      ? words.filter(w => w.groupIds.includes(groupId))
      : words;
    
    // Shuffle words
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5).slice(0, 10);
    setActivityWords(shuffled);
  }, [groupId]);

  const currentWord = activityWords[currentIndex];
  const progress = activityWords.length > 0 
    ? ((currentIndex + (isComplete ? 1 : 0)) / activityWords.length) * 100 
    : 0;

  const handleNext = useCallback(() => {
    if (currentIndex < activityWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlipped(false);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, activityWords.length]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
    setShowResult(true);
    setTimeout(handleNext, 1500);
  };

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentWord?.english;
    handleAnswer(isCorrect);
  };

  const handleTypingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeInput(typedAnswer.trim().toLowerCase());
    const isCorrect = sanitized === currentWord?.greek.toLowerCase() || 
                      sanitized === currentWord?.transliteration.toLowerCase();
    handleAnswer(isCorrect);
  };

  const getQuizOptions = () => {
    if (!currentWord) return [];
    const wrongOptions = words
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.english);
    
    return [...wrongOptions, currentWord.english].sort(() => Math.random() - 0.5);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore({ correct: 0, wrong: 0 });
    setIsComplete(false);
    setFlipped(false);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setShowResult(false);
    setActivityWords([...activityWords].sort(() => Math.random() - 0.5));
  };

  if (!activity) {
    return (
      <Layout breadcrumbs={[{ name: 'Study Activities', href: '/activities' }, { name: 'Not Found' }]}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Activity not found.</p>
          <Link to="/activities">
            <Button className="mt-4">Back to Activities</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const group = groupId ? wordGroups.find(g => g.id === groupId) : null;
  const breadcrumbs = [
    { name: 'Study Activities', href: '/activities' },
    { name: activity.name }
  ];
  if (group) {
    breadcrumbs.splice(1, 0, { name: group.name, href: `/groups/${group.id}` });
  }

  if (isComplete) {
    const accuracy = Math.round((score.correct / activityWords.length) * 100);
    return (
      <Layout breadcrumbs={breadcrumbs}>
        <div className="max-w-lg mx-auto animate-scale-in">
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="pt-8 pb-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                εὖγε! Well done!
              </h2>
              <p className="text-muted-foreground mb-6">You've completed this session.</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-success/10 p-4">
                  <p className="text-2xl font-bold text-success">{score.correct}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-4">
                  <p className="text-2xl font-bold text-destructive">{score.wrong}</p>
                  <p className="text-xs text-muted-foreground">Wrong</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="text-2xl font-bold text-primary">{accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleRestart} className="flex-1 gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link to="/activities" className="flex-1">
                  <Button className="w-full gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Activities
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!currentWord || activityWords.length === 0) {
    return (
      <Layout breadcrumbs={breadcrumbs}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading words...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{currentIndex + 1} of {activityWords.length}</span>
            <span className="flex items-center gap-4">
              <span className="text-success">✓ {score.correct}</span>
              <span className="text-destructive">✗ {score.wrong}</span>
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Activity Content */}
        {activity.type === 'flashcard' && (
          <Card 
            className={cn(
              "min-h-[300px] cursor-pointer transition-all duration-300",
              flipped ? "bg-muted/50" : ""
            )}
            onClick={() => setFlipped(!flipped)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] py-12">
              {!flipped ? (
                <>
                  <p className="font-display text-5xl font-bold text-foreground greek-text mb-4">
                    {currentWord.greek}
                  </p>
                  <p className="text-lg text-muted-foreground italic">
                    {currentWord.transliteration}
                  </p>
                  <p className="mt-6 text-sm text-muted-foreground">Click to reveal</p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-semibold text-foreground mb-8">
                    {currentWord.english}
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => { e.stopPropagation(); handleAnswer(false); }}
                    >
                      <X className="h-5 w-5" />
                      Didn't Know
                    </Button>
                    <Button 
                      size="lg"
                      className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                      onClick={(e) => { e.stopPropagation(); handleAnswer(true); }}
                    >
                      <Check className="h-5 w-5" />
                      Knew It
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {activity.type === 'quiz' && (
          <Card className="min-h-[300px]">
            <CardContent className="py-8">
              <div className="text-center mb-8">
                <p className="font-display text-4xl font-bold text-foreground greek-text mb-2">
                  {currentWord.greek}
                </p>
                <p className="text-muted-foreground italic">{currentWord.transliteration}</p>
              </div>

              <div className="grid gap-3">
                {getQuizOptions().map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "h-auto py-4 text-left justify-start text-base",
                      showResult && option === currentWord.english && "border-success bg-success/10",
                      showResult && selectedAnswer === option && option !== currentWord.english && "border-destructive bg-destructive/10"
                    )}
                    onClick={() => !showResult && handleQuizAnswer(option)}
                    disabled={showResult}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activity.type === 'typing' && (
          <Card className="min-h-[300px]">
            <CardContent className="py-8">
              <div className="text-center mb-8">
                <p className="text-2xl font-semibold text-foreground mb-2">
                  {currentWord.english}
                </p>
                <p className="text-sm text-muted-foreground">Type the Greek word or transliteration</p>
              </div>

              <form onSubmit={handleTypingSubmit} className="space-y-4">
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className={cn(
                    "w-full rounded-lg border bg-background px-4 py-3 text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary",
                    showResult && (
                      typedAnswer.toLowerCase() === currentWord.greek.toLowerCase() || 
                      typedAnswer.toLowerCase() === currentWord.transliteration.toLowerCase()
                    ) && "border-success bg-success/10",
                    showResult && !(
                      typedAnswer.toLowerCase() === currentWord.greek.toLowerCase() || 
                      typedAnswer.toLowerCase() === currentWord.transliteration.toLowerCase()
                    ) && "border-destructive bg-destructive/10"
                  )}
                  disabled={showResult}
                  autoComplete="off"
                  autoFocus
                />
                
                {showResult && (
                  <p className="text-center text-muted-foreground">
                    Answer: <span className="font-display font-semibold text-foreground greek-text">{currentWord.greek}</span>
                    {' '}({currentWord.transliteration})
                  </p>
                )}

                {!showResult && (
                  <Button type="submit" className="w-full gap-2" disabled={!typedAnswer.trim()}>
                    Check Answer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
