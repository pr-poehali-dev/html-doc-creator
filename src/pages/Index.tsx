import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Section = 'introduction' | 'installation' | 'examples' | 'api' | 'faq' | 'support';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('introduction');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: { id: Section; label: string; icon: string }[] = [
    { id: 'introduction', label: 'Введение', icon: 'Home' },
    { id: 'installation', label: 'Установка', icon: 'Download' },
    { id: 'examples', label: 'Примеры', icon: 'Code' },
    { id: 'api', label: 'API', icon: 'Book' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
  ];

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SidebarContent = () => (
    <div className="space-y-2">
      <div className="px-3 py-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Документация
        </h2>
        <p className="text-sm text-muted-foreground mt-2">Версия 1.0.0</p>
      </div>
      <Separator />
      <nav className="space-y-1 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all hover:bg-sidebar-accent ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold border-l-4 border-primary'
                : 'text-sidebar-foreground'
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
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
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              DocHub
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              v1.0.0
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Github" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Moon" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex">
        <aside className="hidden lg:block w-72 border-r bg-sidebar/50 min-h-screen sticky top-16 h-[calc(100vh-4rem)]">
          <SidebarContent />
        </aside>

        <main className="flex-1 p-6 lg:p-10 max-w-4xl animate-fade-in">
          <section id="introduction" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="Rocket" size={32} className="text-primary" />
              <h2 className="text-4xl font-bold">Введение</h2>
            </div>
            <Card className="p-8 shadow-lg hover:shadow-xl transition-all border-l-4 border-primary">
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Добро пожаловать в нашу документацию! Этот проект создан для упрощения
                разработки и предоставления мощных инструментов для ваших задач.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Мы стремимся предоставить простой и понятный интерфейс, который позволит
                вам быстро начать работу и достичь результатов. Наша платформа поддерживает
                современные стандарты и постоянно обновляется.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary">React</Badge>
                <Badge className="bg-secondary">TypeScript</Badge>
                <Badge className="bg-accent">Современный</Badge>
                <Badge variant="outline">Open Source</Badge>
              </div>
            </Card>
          </section>

          <section id="installation" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="Download" size={32} className="text-secondary" />
              <h2 className="text-4xl font-bold">Установка</h2>
            </div>
            <Card className="p-8 shadow-lg hover:shadow-xl transition-all">
              <p className="text-foreground/80 mb-6">
                Начните работу всего за несколько простых шагов:
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Установите зависимости</h3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      npm install dochub-sdk
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Импортируйте библиотеку</h3>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      import &#123; DocHub &#125; from 'dochub-sdk'
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Начните использовать</h3>
                    <p className="text-foreground/70">
                      Готово! Теперь вы можете использовать все возможности платформы.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section id="examples" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="Code" size={32} className="text-accent" />
              <h2 className="text-4xl font-bold">Примеры</h2>
            </div>
            <div className="grid gap-6">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-primary" />
                  Быстрый старт
                </h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-3">
                  <pre className="text-foreground/80">
{`const hub = new DocHub({
  apiKey: 'your-api-key'
});

hub.init();`}
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  Самый простой способ начать работу с платформой.
                </p>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-all">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <Icon name="Settings" size={20} className="text-secondary" />
                  Продвинутая конфигурация
                </h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-3">
                  <pre className="text-foreground/80">
{`const hub = new DocHub({
  apiKey: 'your-api-key',
  options: {
    cache: true,
    timeout: 5000
  }
});`}
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  Настройте параметры под ваши нужды для оптимальной работы.
                </p>
              </Card>
            </div>
          </section>

          <section id="api" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="Book" size={32} className="text-primary" />
              <h2 className="text-4xl font-bold">API Справочник</h2>
            </div>
            <Card className="p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-secondary">GET</Badge>
                    <code className="text-sm font-mono">/api/docs</code>
                  </div>
                  <p className="text-foreground/70">
                    Получить список всех доступных документов.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-primary">POST</Badge>
                    <code className="text-sm font-mono">/api/docs/create</code>
                  </div>
                  <p className="text-foreground/70">
                    Создать новый документ с заданными параметрами.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-accent">PUT</Badge>
                    <code className="text-sm font-mono">/api/docs/:id</code>
                  </div>
                  <p className="text-foreground/70">
                    Обновить существующий документ по его ID.
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="destructive">DELETE</Badge>
                    <code className="text-sm font-mono">/api/docs/:id</code>
                  </div>
                  <p className="text-foreground/70">
                    Удалить документ из системы.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section id="faq" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="HelpCircle" size={32} className="text-accent" />
              <h2 className="text-4xl font-bold">FAQ</h2>
            </div>
            <Card className="p-6 shadow-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold">
                    Как начать использовать платформу?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70">
                    Просто следуйте инструкциям в разделе "Установка". Процесс занимает
                    не более 5 минут и не требует специальных знаний.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold">
                    Какие есть ограничения бесплатного плана?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70">
                    Бесплатный план включает до 1000 запросов в месяц и базовую
                    поддержку. Для больших нагрузок рекомендуем рассмотреть платные планы.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold">
                    Как получить API ключ?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70">
                    Зарегистрируйтесь на платформе и перейдите в настройки аккаунта.
                    Там вы найдете раздел "API ключи", где можно сгенерировать новый ключ.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold">
                    Поддерживается ли TypeScript?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70">
                    Да! Наша библиотека полностью написана на TypeScript и включает
                    все необходимые типы для комфортной разработки.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </section>

          <section id="support" className="mb-16 scroll-mt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Icon name="MessageCircle" size={32} className="text-secondary" />
              <h2 className="text-4xl font-bold">Поддержка</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">Email</h3>
                </div>
                <p className="text-foreground/70 mb-3">
                  Напишите нам на почту для детальной консультации.
                </p>
                <a
                  href="mailto:support@dochub.com"
                  className="text-primary hover:underline font-medium"
                >
                  support@dochub.com
                </a>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Icon name="MessageSquare" size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-xl">Чат</h3>
                </div>
                <p className="text-foreground/70 mb-3">
                  Онлайн-чат доступен с 9:00 до 21:00 по МСК.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90">
                  Открыть чат
                </Button>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Icon name="Github" size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl">GitHub</h3>
                </div>
                <p className="text-foreground/70 mb-3">
                  Сообщите о баге или предложите улучшение.
                </p>
                <a
                  href="https://github.com/dochub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  github.com/dochub
                </a>
              </Card>

              <Card className="p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon name="BookOpen" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">База знаний</h3>
                </div>
                <p className="text-foreground/70 mb-3">
                  Изучите руководства и статьи по использованию.
                </p>
                <Button variant="outline">Перейти к статьям</Button>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
