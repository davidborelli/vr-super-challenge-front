import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificacaoService } from '../../services/notificacao.service';

interface Mensagem {
  mensagemId: string;
  status: string;
}

@Component({
  selector: 'app-notificacao',
  imports: [FormsModule],
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css'],
})
export class NotificacaoComponent {
  conteudoMensagem = '';
  mensagens: Mensagem[] = [];

  constructor(private notificacaoService: NotificacaoService) {}

  enviar() {
    const conteudo = this.conteudoMensagem.trim();
    if (!conteudo) return;

    this.notificacaoService.enviarMensagem(conteudo).subscribe((res) => {
      this.mensagens.push({ mensagemId: res.mensagemId, status: res.status });
      this.conteudoMensagem = '';
      this.iniciarPollingStatus(res.mensagemId);
    });
  }

  iniciarPollingStatus(mensagemId: string) {
    const intervalo = setInterval(() => {
      this.notificacaoService.consultarStatus(mensagemId).subscribe((res) => {
        const item = this.mensagens.find((m) => m.mensagemId === mensagemId);
        if (item && item.status !== res.status) {
          item.status = res.status;
          clearInterval(intervalo);
        }
      });
    }, 3000);
  }
}
