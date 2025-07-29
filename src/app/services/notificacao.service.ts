import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private readonly API_URL = 'http://localhost:3000/api/notificar';

  constructor(private http: HttpClient) {}

  enviarMensagem(conteudoMensagem: string): Observable<{ mensagemId: string; status: string }> {
    const mensagemId = uuidv4();
    return this.http.post<{ mensagemId: string; status: string }>(this.API_URL, {
      mensagemId,
      conteudoMensagem,
    });
  }

  consultarStatus(mensagemId: string): Observable<{ mensagemId: string; status: string }> {
    return this.http.get<{ mensagemId: string; status: string }>(`${this.API_URL}/status/${mensagemId}`);
  }
}
