import { Component } from '@angular/core';
import { Glow } from '../../shared/glow';

interface Skill {
  name: string;
  icon: string;
  /** dark logos are turned white so they stay visible on the dark background */
  light?: boolean;
}

interface SkillGroup {
  title: string;
  symbol: string;
  skills: Skill[];
}

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

const GROUPS: SkillGroup[] = [
  {
    title: 'Languages',
    symbol: '</>',
    skills: [
      { name: 'C', icon: devicon('c/c-original') },
      { name: 'C++', icon: devicon('cplusplus/cplusplus-original') },
      { name: 'Python', icon: devicon('python/python-original') },
      { name: 'Java', icon: devicon('java/java-original') },
      { name: 'JavaScript', icon: devicon('javascript/javascript-original') },
      { name: 'Rust', icon: devicon('rust/rust-original'), light: true },
      { name: 'Bash', icon: devicon('bash/bash-original'), light: true },
    ],
  },
  {
    title: 'Frameworks',
    symbol: '◇',
    skills: [
      { name: 'Spring Boot', icon: devicon('spring/spring-original') },
      { name: 'React', icon: devicon('react/react-original') },
      { name: 'Next.js', icon: devicon('nextjs/nextjs-original'), light: true },
      { name: 'Express', icon: devicon('express/express-original'), light: true },
      { name: 'FastAPI', icon: devicon('fastapi/fastapi-original') },
      { name: 'Kafka', icon: devicon('apachekafka/apachekafka-original'), light: true },
      { name: 'PyTorch', icon: devicon('pytorch/pytorch-original') },
      { name: 'Wordpress', icon: devicon('wordpress/wordpress-plain'), light: true },
      { name: 'WooCommerce', icon: devicon('woocommerce/woocommerce-original') },
    ],
  },
  {
    title: 'Cloud & Infra',
    symbol: '☁',
    skills: [
      { name: 'AWS', icon: devicon('amazonwebservices/amazonwebservices-plain-wordmark'), light: true },
      { name: 'Docker', icon: devicon('docker/docker-original') },
      { name: 'Kubernetes', icon: devicon('kubernetes/kubernetes-original') },
      { name: 'Grafana', icon: devicon('grafana/grafana-original') },
      { name: 'Terraform', icon: devicon('terraform/terraform-original') },
      { name: 'GraphQL', icon: devicon('graphql/graphql-plain') },
      { name: 'Cloudflare', icon: devicon('cloudflare/cloudflare-original') },
    ],
  },
  {
    title: 'AI & Data',
    symbol: '✦',
    skills: [
      { name: 'LangChain', icon: devicon('python/python-original') },
      // local files: put them in your Angular `public/` folder
      { name: 'LangGraph', icon: 'langgraph.png' },
      { name: 'Ollama', icon: 'ollama.webp' },
      { name: 'Claude', icon: 'claude.png' },
      { name: 'MySQL', icon: devicon('mysql/mysql-original') },
      { name: 'MongoDB', icon: devicon('mongodb/mongodb-original') },
      { name: 'Redis', icon: devicon('redis/redis-original') },
      { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original') },
      { name: 'Cassandra', icon: devicon('cassandra/cassandra-original') },
    ],
  },
];

@Component({
  selector: 'app-tech',
  imports: [Glow],
  styleUrl: 'tech.scss',
  template: `
    <section id="tech" class="sec">
      <p class="eyebrow"><b>03</b><u></u>MY TOOLKIT</p>

      <h2>Tools I think in.</h2>
      <p class="sub">From systems programming to orchestration to inference — the full picture.</p>

      <div class="grid">
        @for (group of groups; track group.title) {
          <div class="card" >
            <h4>
              <span class="acc">{{ group.symbol }}</span>
              {{ group.title }}
            </h4>

            <div class="pills">
              @for (skill of group.skills; track skill.name) {
                <span class="pill mono">
                  <img [src]="skill.icon" [class.light]="skill.light" alt="" loading="lazy" />
                  {{ skill.name }}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class Tech {
  protected readonly groups = GROUPS;
}
