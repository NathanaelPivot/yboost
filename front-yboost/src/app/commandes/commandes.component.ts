import { Component, inject, OnInit } from '@angular/core';
import { Commande } from '../models/commande.models';
import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent implements OnInit {
  public commandes: Commande[] = [];
  private commandeService = inject(CommandesService)

  ngOnInit() {
    this.fetchCommandes()
  }

  fetchCommandes(): void {
    this.commandeService.getCommandes().subscribe((data) => {
      this.commandes = data
    })
  }

  updateCommande(id: number) {
    console.log(`la commande avec l'id ${id} a été update!`)
  }

  cancelCommande(id: number) {
    console.log(`la commande avec l'id ${id} a été annulé!`)
  }
}
