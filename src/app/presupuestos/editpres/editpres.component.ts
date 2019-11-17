import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  iva = 0;
  total = 0;

  id: string;
  proveedores: any[];

  constructor(private pf: FormBuilder,
    private presupuestosService: PresupuestosService,
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activateRouter: ActivatedRoute) {
    this.activateRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.presupuestosService.getPresupuesto(this.id).subscribe(presupuesto => this.presupuesto = presupuesto);
    });
  }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', Validators.required],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: this.iva,
      total: this.total
    });

    this.proveedores = this.proveedoresService.getProveedores();
    this.onChanges();
  }

  onChanges() {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestosService.putPresupuesto(this.presupuesto, this.id).subscribe(newpre => {
      this.router.navigate(['/presupuestos']);
    });
  }

  savePresupuesto() {
    const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value,
    };
    return savePresupuesto;
  }

}
