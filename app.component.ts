import {Component, ViewEncapsulation} from '@angular/core';
import { NgModule, Compiler } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  title = 'ecommerceapp';

  constructor(private compiler: Compiler,
              private router: Router) {}
  createDynamic() {
    const template = '<span>Dynamic Products</span>';
    const tmpCmp = Component({template})(class {});

    const routes = [{path: '', component: tmpCmp}];
    const tmpModule = NgModule({
      imports: [RouterModule.forChild(routes)],
      declarations: [tmpCmp]})(class {});

    this.compiler.compileModuleAsync(tmpModule).then((module) => {

      const appRoutes = [...this.router.config];

      const route = {
        path: 'dynamic',
        loadChildren() { return module; }
      };

      appRoutes.push(route);

      this.router.resetConfig(appRoutes);
      this.router.navigateByUrl('/dynamic');
    });
  }
}
