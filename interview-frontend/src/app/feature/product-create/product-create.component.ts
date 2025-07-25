import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../core/service/http.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  productForm: FormGroup;
  editId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.getProductById(this.route.snapshot.params['id']);
      this.editId = this.route.snapshot.params['id'];
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const payload = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description
      };
      if (!this.editId) {
        this.http.post(`${environment.apiUrl}/products`, payload).subscribe({
          next: (response) => {
            this.toastr.success('Product created successfully!');
            this.router.navigate(['/product-list']);
          },
          error: (error) => {
            this.toastr.error('Error creating product!');
          }
        });
      } else {
        this.http.patch(`${environment.apiUrl}/products/${this.editId}`, payload).subscribe({
          next: (response) => {
            this.toastr.success('Product updated successfully!');
            this.router.navigate(['/product-list']);
          },
          error: (error) => {
            this.toastr.error('Error updating product!');
          }
        });
      }
    }
  }

  getProductById(id: string) {
    this.http.get(`${environment.apiUrl}/products/${id}`).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.productForm.patchValue({
            name: response.data.name,
            price: response.data.price,
            description: response.data.description
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error fetching product details!');
      }
    });
  }
}
