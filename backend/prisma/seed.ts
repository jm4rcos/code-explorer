import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const technologies = [
    {
      name: 'HTML',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=html.spec.whatwg.org',
    },
    {
      name: 'CSS',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.w3schools.com',
    },
    {
      name: 'JavaScript',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.javascript.com',
    },
    {
      name: 'TypeScript',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.typescriptlang.org',
    },
    {
      name: 'Node.js',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.nodejs.org',
    },
    {
      name: 'React',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=reactjs.org',
    },
    {
      name: 'Angular',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=angular.io',
    },
    {
      name: 'Vue.js',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=vuejs.org',
    },
    {
      name: 'Python',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.python.org',
    },
    {
      name: 'Ruby',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.ruby-lang.org',
    },
    {
      name: 'PHP',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.php.net',
    },
    {
      name: 'Swift',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.swift.org',
    },
    {
      name: 'Go',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.go.dev',
    },
    {
      name: 'Kotlin',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.kotlinlang.org',
    },
    {
      name: 'Java',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.java.com',
    },
    {
      name: 'Scala',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.scala-lang.org',
    },
    {
      name: 'C#',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.csharp.net',
    },
    {
      name: 'Perl',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.perl.org',
    },
    {
      name: 'Elixir',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.elixir-lang.org',
    },
    {
      name: 'Haskell',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.haskell.org',
    },
    {
      name: 'Laravel',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.laravel.com',
    },
    {
      name: 'Django',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.djangoproject.com',
    },
    {
      name: 'Spring',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.spring.io',
    },
    {
      name: 'Express',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.expressjs.com',
    },
    {
      name: 'Flask',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=flask.palletsprojects.com',
    },
    {
      name: 'Bootstrap',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=getbootstrap.com',
    },
    {
      name: 'Tailwind CSS',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.tailwindcss.com',
    },
    {
      name: 'jQuery',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=jquery.com',
    },
    {
      name: 'Sass',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=sass-lang.com',
    },
    {
      name: 'Less',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=lesscss.org',
    },
    {
      name: 'GraphQL',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=graphql.org',
    },
    {
      name: 'Rust',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.rust-lang.org',
    },
    {
      name: 'C++',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.cplusplus.com',
    },
    {
      name: 'C',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=cprogramming.com',
    },
    {
      name: 'SQL',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.sql.org',
    },
    {
      name: 'MongoDB',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.mongodb.com',
    },
    {
      name: 'Redis',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=redis.io',
    },
    {
      name: 'SQLite',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.sqlite.org',
    },
    {
      name: 'PostgreSQL',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.postgresql.org',
    },
    {
      name: 'Oracle',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.oracle.com',
    },
    {
      name: 'Microsoft SQL Server',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=microsoft.com',
    },
    {
      name: 'IBM',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=www.ibm.com',
    },
    {
      name: 'Salesforce',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.salesforce.com',
    },
    {
      name: 'Adobe',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.adobe.com',
    },
    {
      name: 'Heroku',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.heroku.com',
    },
    {
      name: 'DigitalOcean',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.digitalocean.com',
    },
    {
      name: 'Cloudflare',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.cloudflare.com',
    },
    {
      name: 'GitHub',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=www.github.com',
    },
    {
      name: 'Docker',
      image: 'https://www.google.com/s2/favicons?sz=64&domain_url=docker.com',
    },
    {
      name: 'Kubernetes',
      image:
        'https://www.google.com/s2/favicons?sz=64&domain_url=kubernetes.io',
    },
  ];

  await prisma.technology.createMany({ data: technologies });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
