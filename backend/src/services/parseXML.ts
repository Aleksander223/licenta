import { parseString } from "xml2js";

export function parseXML() {
    const xml = 
    `
    <?xml version="1.0"?>
<chestionar>
<sectiune>
<intrebare>
 <enunt> Prezența mea la curs se încadrează în intervalul:</enunt>
<rasp>  a. 0-25%;  </rasp>
<rasp>	b. 26-50%;	</rasp>
<rasp>	c. 51-75%; </rasp>
<rasp>	d. 76-100%. </rasp>
</intrebare>

<label>1. Aprecieri asupra materiei predate la curs</label>
<intrebare>

<enunt> 	1.1. Dificultatea materiei a fost corespunzatoare </enunt>
  <rasp>  a. Dezacord total;</rasp>
  <rasp>	b. Dezacord parțial;</rasp>
  <rasp>	c. Neutru;</rasp>
  <rasp>	d. Acord parțial;	</rasp>
  <rasp>  e. Acord total.</rasp>
</intrebare>

<intrebare>

<enunt> 	1.2. Resursele de invatare puse la dispozitie au fost accesibile si utile</enunt>
 <rasp>	a. Dezacord total;</rasp>
  <rasp>	b. Dezacord parțial;</rasp>
  <rasp>	c. Neutru;	</rasp>
  <rasp>d. Acord parțial;	</rasp>
  <rasp>e. Acord total.</rasp>
</intrebare>

<intrebare>

<enunt> 	1.3. A fost explicata utilitatea materiei </enunt>
 <rasp>a. Dezacord total;</rasp>
  <rasp>	b. Dezacord parțial;</rasp>
  <rasp>	c. Neutru;</rasp>
  <rasp>	d. Acord parțial;	</rasp>
  <rasp>e. Acord total.</rasp>
</intrebare>

</sectiune>
<sectiune>
<label>2. Aprecieri asupra profesorului de curs</label>

<intrebare>

<enunt> 	2.1 A prezentat in mod clar obiectivele cursului si cerințele de evaluare</enunt>
  <rasp>  a. Dezacord total;</rasp>
  <rasp>	b. Dezacord parțial;</rasp>
  <rasp>	c. Neutru;</rasp>
  <rasp>	d. Acord parțial;</rasp>
  <rasp>	e. Acord total.</rasp>

</intrebare>

<intrebare>

<enunt> 	2.2 A respectat pe parcursul semestrului obiectivele anunțate</enunt>
  <rasp>  a. Dezacord total;</rasp>
  <rasp>	b. Dezacord parțial;</rasp>
  <rasp>	c. Neutru;</rasp>
  <rasp>	d. Acord parțial;</rasp>
  <rasp>	e. Acord total. </rasp>
</intrebare>

<intrebare>


<enunt> 	2.3 Expunerea sa a fost clara, sistematica si coerenta</enunt>
 <rasp> a. Dezacord total;</rasp>
 <rasp>	b. Dezacord parțial;</rasp>
 <rasp>	c. Neutru;	</rasp>
 <rasp>d. Acord parțial;	</rasp>
 <rasp>e. Acord total.</rasp>

</intrebare>

<intrebare>

<enunt> 	2.4 A prezentat materia într-o manieră atractivă</enunt>
 <rasp>	a. Dezacord total;</rasp>
 <rasp>	b. Dezacord parțial;</rasp>
 <rasp>	c. Neutru;</rasp>
 <rasp>	d. Acord parțial;</rasp>
 <rasp>	e. Acord total.</rasp>

</intrebare>

<intrebare>

<enunt> 	2.5 A prezentat materia într-o manieră interactivă si a fost disponibil pentru intrebari</enunt>
 <rasp> a. Dezacord total;	</rasp>
 <rasp> b. Dezacord parțial;</rasp>
 <rasp>	c. Neutru;</rasp>
 <rasp>	d. Acord parțial;</rasp>
 <rasp>	e. Acord total.</rasp>
</intrebare>

<intrebare>

<enunt> 	2.6 A fost punctual și a utilizat eficient timpul programat activității de curs</enunt>
 <rasp> a. Dezacord total;</rasp>
 <rasp>	b. Dezacord parțial;</rasp>
 <rasp>	c. Neutru;</rasp>
 <rasp>	d. Acord parțial;	</rasp>
 <rasp>e. Acord total.</rasp>

</intrebare>

<intrebare>

<enunt> 	2.7 A cultivat respectul reciproc intre profesor si studenti </enunt>
 <rasp>	a. Dezacord total;</rasp>
 <rasp>	b. Dezacord parțial;</rasp>
 <rasp>	c. Neutru;</rasp>
 <rasp>	d. Acord parțial;	</rasp>
 <rasp>e. Acord total.</rasp>

</intrebare>
</sectiune>
<sectiune>


<label>3. Chestionar pentru evaluarea examenelor</label>

<intrebare>

<enunt> 	3.1. Modul de desfasurare al examenului a corespuns informatiilor primite</enunt>
 <rasp>	a.	Dezacord total</rasp>
 <rasp> b.	Dezacord partial</rasp>
 <rasp> c.	Neutru </rasp>
 <rasp> d.	Acord partial</rasp>
 <rasp> e.	Acord total </rasp>

</intrebare>

<intrebare>

<enunt> 	3.2. Nivelul de dificultate al examenului a fost:</enunt>
  <rasp> a.	Prea scazut</rasp>
  <rasp> b.	Scazut</rasp>
<rasp> c.	Bun</rasp>
<rasp> d.	Ridicat</rasp>
<rasp> e.	Prea ridicat </rasp>
</intrebare>

<intrebare>

<enunt> 	3.3. Modul de examinare a fost adecvat tipului si structurii cursului:</enunt>
  <rasp>a.	Dezacord total  </rasp>
  <rasp>b.	Dezacord partial   </rasp>
  <rasp>c.	Neutru  </rasp>
  <rasp>d.	Acord partial</rasp>
  <rasp>e.	Acord total</rasp>

</intrebare>

<intrebare>

<enunt> 3.4.  Organizarea examenului (modul in care a fost pregatit de profesor si modul in care s-a desfasurat) a creat un mediu corect, care sa previna posibile fraude si care sa nu avantajeze anumite grupe/ studenti.</enunt>
<rasp>a.	Dezacord total</rasp>
<rasp>b.	Dezacord partial</rasp>
<rasp>c.	Neutru</rasp>
<rasp>d.	Acord partial</rasp>
<rasp>e.	Acord total</rasp>

</intrebare>

</sectiune>
<sectiune>
<intrebare>
<enunt>4. Ce mi-a plăcut / ce nu mi-a plăcut / ce aș îmbunătăți</enunt>
</intrebare>
</sectiune>


</chestionar>

    `

    parseString(xml, (e, r: Object) => {
        console.log(JSON.stringify(r, null, 4));
    })
}