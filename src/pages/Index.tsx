import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  checked: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState(() => {
    const saved = localStorage.getItem('checklist-title');
    return saved || 'Чек-лист проекта';
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('checklist-title', checklistTitle);
  }, [checklistTitle]);
  
  const categories: Category[] = [
    { id: 'setup', label: 'Настройка', icon: 'Settings', color: 'primary' },
    { id: 'development', label: 'Разработка', icon: 'Code', color: 'secondary' },
    { id: 'testing', label: 'Тестирование', icon: 'FlaskConical', color: 'accent' },
    { id: 'deployment', label: 'Деплой', icon: 'Rocket', color: 'primary' },
    { id: 'documentation', label: 'Документация', icon: 'BookOpen', color: 'secondary' },
    { id: 'optimization', label: 'Оптимизация', icon: 'Zap', color: 'accent' },
  ];

  const initialItems: ChecklistItem[] = [
    { id: '1', title: 'Установить Node.js и npm', description: 'Скачайте последнюю LTS версию с nodejs.org', category: 'setup', checked: false },
    { id: '2', title: 'Настроить Git и создать репозиторий', description: 'Инициализируйте проект и подключите к GitHub', category: 'setup', checked: false },
    { id: '3', title: 'Установить зависимости проекта', description: 'Выполните npm install в корне проекта', category: 'setup', checked: false },
    { id: '4', title: 'Настроить ESLint и Prettier', description: 'Добавьте конфигурацию для проверки кода', category: 'setup', checked: false },
    
    { id: '5', title: 'Создать структуру компонентов', description: 'Разделите UI на переиспользуемые компоненты', category: 'development', checked: false },
    { id: '6', title: 'Реализовать основной функционал', description: 'Добавьте ключевые фичи приложения', category: 'development', checked: false },
    { id: '7', title: 'Настроить маршрутизацию', description: 'Используйте React Router для навигации', category: 'development', checked: false },
    { id: '8', title: 'Подключить API и обработку данных', description: 'Настройте запросы к бэкенду', category: 'development', checked: false },
    
    { id: '9', title: 'Написать unit тесты', description: 'Покройте тестами критичные функции', category: 'testing', checked: false },
    { id: '10', title: 'Провести integration тестирование', description: 'Проверьте взаимодействие компонентов', category: 'testing', checked: false },
    { id: '11', title: 'Выполнить E2E тестирование', description: 'Протестируйте пользовательские сценарии', category: 'testing', checked: false },
    
    { id: '12', title: 'Настроить CI/CD pipeline', description: 'Автоматизируйте сборку и деплой', category: 'deployment', checked: false },
    { id: '13', title: 'Подготовить production билд', description: 'Оптимизируйте код для продакшена', category: 'deployment', checked: false },
    { id: '14', title: 'Развернуть на хостинге', description: 'Загрузите приложение на сервер', category: 'deployment', checked: false },
    
    { id: '15', title: 'Написать README', description: 'Опишите проект и инструкции по запуску', category: 'documentation', checked: false },
    { id: '16', title: 'Создать документацию API', description: 'Задокументируйте все эндпоинты', category: 'documentation', checked: false },
    { id: '17', title: 'Добавить примеры использования', description: 'Покажите типичные кейсы применения', category: 'documentation', checked: false },
    
    { id: '18', title: 'Оптимизировать производительность', description: 'Используйте lazy loading и мемоизацию', category: 'optimization', checked: false },
    { id: '19', title: 'Настроить кеширование', description: 'Добавьте стратегию кеширования данных', category: 'optimization', checked: false },
    { id: '20', title: 'Проверить доступность (a11y)', description: 'Убедитесь что сайт доступен всем', category: 'optimization', checked: false },
  ];

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('checklist-items');
    return saved ? JSON.parse(saved) : initialItems;
  });

  useEffect(() => {
    localStorage.setItem('checklist-items', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const resetAll = () => {
    if (confirm('Сбросить весь прогресс?')) {
      setItems(items.map(item => ({ ...item, checked: false })));
    }
  };

  const getProgress = () => {
    const total = items.length;
    const completed = items.filter(item => item.checked).length;
    return Math.round((completed / total) * 100);
  };

  const getCategoryProgress = (categoryId: string) => {
    const categoryItems = items.filter(item => item.category === categoryId);
    const completed = categoryItems.filter(item => item.checked).length;
    return categoryItems.length > 0 ? Math.round((completed / categoryItems.length) * 100) : 0;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const progress = getProgress();
    
    doc.setFontSize(22);
    doc.text(checklistTitle, pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, pageWidth / 2, 30, { align: 'center' });
    doc.text(`Общий прогресс: ${progress}%`, pageWidth / 2, 37, { align: 'center' });
    
    let yPosition = 50;
    const lineHeight = 7;
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    categories.forEach((category) => {
      const categoryItems = items.filter(item => item.category === category.id);
      const categoryProgress = getCategoryProgress(category.id);
      
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${category.label} (${categoryProgress}%)`, margin, yPosition);
      yPosition += lineHeight + 2;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      categoryItems.forEach((item) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        const checkbox = item.checked ? '[✓]' : '[ ]';
        doc.text(checkbox, margin, yPosition);
        
        const titleLines = doc.splitTextToSize(item.title, maxWidth - 15);
        doc.text(titleLines, margin + 10, yPosition);
        yPosition += lineHeight * titleLines.length;
        
        if (item.description) {
          doc.setTextColor(100, 100, 100);
          const descLines = doc.splitTextToSize(item.description, maxWidth - 15);
          doc.text(descLines, margin + 10, yPosition);
          yPosition += lineHeight * descLines.length;
          doc.setTextColor(0, 0, 0);
        }
        
        yPosition += 3;
      });
      
      yPosition += 5;
    });
    
    doc.save(`checklist-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF успешно экспортирован!');
  };

  const SidebarContent = () => (
    <div className="space-y-2">
      <div className="px-3 py-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Чек-лист
        </h2>
        <p className="text-sm text-muted-foreground mt-2">Прогресс: {getProgress()}%</p>
        <Progress value={getProgress()} className="mt-3" />
      </div>
      <Separator />
      <nav className="space-y-1 py-4 px-2">
        {categories.map((cat) => {
          const progress = getCategoryProgress(cat.id);
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-lg hover:bg-sidebar-accent transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon name={cat.icon} size={18} className="text-primary" />
                  <span className="font-medium text-sm">{cat.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </a>
          );
        })}
      </nav>
      <Separator />
      <div className="p-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={resetAll}
        >
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Сбросить всё
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Icon name="ListChecks" size={28} className="text-primary" />
            {isEditingTitle ? (
              <input
                type="text"
                value={checklistTitle}
                onChange={(e) => setChecklistTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                className="text-xl font-bold bg-transparent border-b-2 border-primary outline-none px-2"
                autoFocus
              />
            ) : (
              <h1 
                className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => setIsEditingTitle(true)}
              >
                {checklistTitle}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex">
              {items.filter(i => i.checked).length} / {items.length}
            </Badge>
            <Button variant="ghost" size="icon" onClick={exportToPDF}>
              <Icon name="Download" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex">
        <aside className="hidden lg:block w-72 border-r bg-sidebar/50 min-h-screen sticky top-16 h-[calc(100vh-4rem)]">
          <SidebarContent />
        </aside>

        <main className="flex-1 p-6 lg:p-10 max-w-4xl animate-fade-in">
          <div className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{checklistTitle}</h2>
                  <p className="text-muted-foreground">
                    Выполнено {items.filter(i => i.checked).length} из {items.length} задач
                  </p>
                </div>
                <div className="text-5xl font-bold text-primary">
                  {getProgress()}%
                </div>
              </div>
              <Progress value={getProgress()} className="mt-4 h-3" />
            </Card>
          </div>

          {categories.map((category) => {
            const categoryItems = items.filter(item => item.category === category.id);
            const completedCount = categoryItems.filter(item => item.checked).length;
            
            return (
              <section key={category.id} id={category.id} className="mb-12 scroll-mt-20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name={category.icon} size={28} className="text-primary" />
                    <h2 className="text-3xl font-bold">{category.label}</h2>
                  </div>
                  <Badge variant="outline">
                    {completedCount} / {categoryItems.length}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`p-5 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                        item.checked ? 'bg-muted/50 border-primary/30' : ''
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg mb-1 transition-all ${
                              item.checked
                                ? 'line-through text-muted-foreground'
                                : 'text-foreground'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm transition-all ${
                              item.checked
                                ? 'text-muted-foreground/70'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                        {item.checked && (
                          <Icon
                            name="CheckCircle2"
                            size={24}
                            className="text-primary flex-shrink-0"
                          />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Index;