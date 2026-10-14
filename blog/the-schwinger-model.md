# The Schwinger Model

This document was made in parallel to my understanding of The Schwinger Model. Nothing here is to be taken as a scientific source of truth. This is just my understanding with analogies and visualization that helped me make sense of it.
## What is the Schwinger Model?

The Schwinger model asks what happens when light and electrons interact in a universe with one space dimension. It is a 1+1D system — 1 space and 1 time dimension. From here onward, "universe" will refer to the one-dimensional space.

Electrons and positrons exist in this universe, and allowed to interact through quantum mechanics.
### The continuum picture

A quantum fermionic field $\psi(x,t)$ exists everywhere in the universe, and this field can create or annihilate electron-positron interactions.

The relativistic Dirac spinor in 1D: $$\psi(x,t) = \begin{pmatrix} \psi_1(x,t) \\ \psi_2(x,t) \end{pmatrix}$$
This is essentially a representation of a relativistic fermion that a single wavefunction cannot capture.

An electromagnetic gauge field $A_\mu(x,t)$ exists, and in one dimension, it only has an electric component.

The theory is described by: $$\mathcal{L} = \bar{\psi} i \gamma^{\mu}(\partial_{\mu} + ieA_{\mu})\psi - \frac{1}{4}{F_{\mu\nu}F^{\mu\nu}}$$
This is the idealized massless Schwinger model.

Here:
- $\psi$ is the charged fermionic field
- $A_{\mu}$ is the electromagnetic gauge field
- $e$ is the coupling strength
- $F_{\mu\nu}$ describes the electromagnetic field
- $\gamma^{\mu}$ are matrices required to describe relativistic fermions

The Lagrangian contains both the fermion field and the gauge field, as well as a term coupling them. That coupling is the essential ingredient.
### The lattice picture
The space is discretized into sites and links.
#### At each site:
A fermionic mode exists, whose occupation represents matter degrees of freedom. What does this mean?

A "mode" means one independent fermionic state, localized at a lattice site. A mode can be empty, occupied, or in a superposition of those possibilities.

In a staggered-fermionic lattice, each site $n$ has a single fermionic mode described by two operators: $\chi_n$ and $\chi_n^\dagger$.

$\chi_n$ means annihilate a fermion in mode $n$.
$\chi_n^\dagger$ means create a fermion in mode $n$.

The occupation operator is

$$  
\hat n_n=\chi_n^\dagger\chi_n.  
$$

This basically counts the number of matter particles residing in a specific lattice mode.

For a single fermionic mode, the allowed occupation numbers are only zero and one:

$$  
\hat n_n|0\rangle=0,  
\qquad  
\hat n_n|1\rangle=|1\rangle.  
$$

Here, $|0\rangle$ means the mode is empty, and $|1\rangle$ means the mode is occupied.

In a **staggered-fermion setup** we use a single fermionic mode at each site instead of putting both components of the relativistic Dirac spinor at every site. The two components are effectively distributed across alternating lattice sites.

A common reference vacuum has even sites empty and odd sites occupied. This alternating pattern is part of the mathematical representation of the relativistic vacuum; it does not mean that physical electrons and positrons must alternate along a line.

A reference vacuum means no physical particle excitations. It is not an exact vacuum.

With $N$ such modes, the matter Hilbert space has dimension $2^N$, before imposing gauge constraints. These are the matter degrees of freedom.

What is a gauge field?
"A gauge field is a **local connection** that tracks the orientation of a particle's internal U(1) phase space across spacetime, ensuring that physics remains completely unchanged regardless of how we arbitrarily define that orientation at any given point."

#### At each link
The gauge field, represented by a link variable $U_n$, and its conjugate electric field $L_n$. This link connects sites $n$ and $n+1$.

The link variable can be written as

$$  
U_n=e^{i\theta_n},  
$$

where $\theta_n$ represents the gauge-field variable associated with that link. The conjugate electric field $L_n$ represents the electric flux along it.

Suppose we want a fermion to move from site $n+1$ to site $n$. This can be described mathematically by

$$  
\chi_n^\dagger\chi_{n+1}.  
$$

Here, $\chi_{n+1}$ annihilates the fermion at site $n+1$, and $\chi_n^\dagger$ creates it at site $n$.

Since the Schwinger model is a gauge theory, this hopping process must respect local gauge invariance.

What is the local U(1) gauge symmetry?
"**Local U(1) gauge symmetry** means that the fundamental laws of physics must remain unchanged even if you rotate the phase of a quantum particle's wavefunction $e^{i\theta }$ by a different amount at every single point in space and time. Because changing these phases independently across spacetime disrupts how particles interact and move, you cannot maintain this symmetry for a free, isolated particle. To fix this and restore balance, nature must introduce a new vector field—the **electromagnetic gauge field** (the photon)—which acts as a mediator to absorb these local shifts. In short, demanding that this local phase symmetry exists mathematically forces the physical reality of **electromagnetism** into existence."

Under a local gauge transformation,

$$  
\chi_n\longrightarrow e^{i\alpha_n}\chi_n.  
$$

Since each site can have a different phase $\alpha_n$, the product $\chi_n^\dagger\chi_{n+1}$ does not remain gauge invariant on its own.

So, we introduce a link variable $U_n$ between the two sites and replace the previous product with

$$  
\boxed{\chi_n^\dagger U_n\chi_{n+1}}.  
$$

The link variable transforms as

$$  
U_n\longrightarrow  
e^{i(\alpha_n-\alpha_{n+1})}U_n.  
$$

This exactly cancels the phase factors introduced by the fermionic operators. Therefore, the complete hopping term is gauge invariant.

The link variable allows matter to move between neighboring sites while preserving gauge invariance. Its conjugate electric field $L_n$ describes the electric flux on the link.

Gauss's law connects the matter degrees of freedom at each site to the electric fluxes on the neighboring links:

$$  
\boxed{L_n-L_{n-1}=Q_n.}  
$$

This says that the difference between the outgoing and incoming electric flux at a site must equal the charge at that site.

In the staggered-fermion formulation, the charge operator is defined as

$$  
Q_n=\hat n_n-\frac{1-(-1)^n}{2}.  
$$

The second term subtracts a staggered background charge. It is zero at even sites and one at odd sites.

### The Hamiltonian: How the System Evolves

We have established the matter degrees of freedom on the sites, the gauge field and electric flux on the links, and Gauss's law connecting them.

But how does the system actually evolve? How do particles move between sites, and how does the electric field respond to them?

This is where the **Hamiltonian** comes in. The Hamiltonian describes the energy of the system and determines how its quantum state evolves with time.

In the lattice Schwinger model, the Hamiltonian is

$$  
\begin{aligned}  
H={}&\frac{1}{2a}\sum_{n=1}^{N-1}  
\left(  
\phi_n^\dagger U_n\phi_{n+1}  
+\mathrm{H.c.}  
\right)\  
&+m\sum_{n=1}^{N}(-1)^n  
\phi_n^\dagger\phi_n\  
&+\frac{g^2a}{2}\sum_{n=1}^{N-1}L_n^2.  
\end{aligned}  
$$

Before breaking this down, let's establish what each symbol means.

- $H$ is the Hamiltonian, representing the total energy of the system.
    
- $N$ is the number of lattice sites. With open boundary conditions, there are $N-1$ links connecting neighbouring sites.
    
- $n$ is the site or link index, depending on the term.
    
- $a$ is the lattice spacing, which is the distance between neighbouring sites.
    
- $\phi_n$ annihilates a fermion in the mode at site $n$, while $\phi_n^\dagger$ creates one.
    
- $\phi_n^\dagger\phi_n$ is the occupation operator. It tells us whether the fermionic mode at site $n$ is occupied.
    
- $U_n$ is the gauge-link variable on the link between sites $n$ and $n+1$. It accounts for the gauge field when matter moves across that link.
    
- $L_n$ is the electric flux on link $n$. Its square, $L_n^2$, determines the electric-field energy associated with that link.
    
- $m$ is the bare fermion mass parameter.
    
- $g$ is the gauge coupling, which determines the strength of the interaction between matter and the gauge field.
    
- $\mathrm{H.c.}$ means _Hermitian conjugate_. We will see exactly what this means in the hopping term.
    

The Hamiltonian consists of three main contributions.

#### 1. Matter hopping

The first term is
$$
\frac{1}{2a}\sum_{n=1}^{N-1}  
\left(  
\phi_n^\dagger U_n\phi_{n+1}  
+\mathrm{H.c.}  
\right).  
$$

This term describes matter moving between neighbouring sites.

Consider the operator inside the summation:

$$  
A_n=\phi_n^\dagger U_n\phi_{n+1}.  
$$

The operators act in the following way:

- $\phi_{n+1}$ annihilates a fermion at site $n+1$.
    
- $U_n$ accounts for the gauge field on the link connecting the two sites.
    
- $\phi_n^\dagger$ creates a fermion at site $n$.
    

Together, they describe a fermion hopping from site $n+1$ to site $n$, with the gauge field included in the process.

**But what exactly is the Hermitian conjugate?**

The Hermitian conjugate of a product reverses the order of its operators and takes the Hermitian conjugate of each one:

$$  
(ABC)^\dagger=C^\dagger B^\dagger A^\dagger.  
$$

Applying this rule gives

$$  
\begin{aligned}  
A_n^\dagger  
&=  
\left(\phi_n^\dagger U_n\phi_{n+1}\right)^\dagger\  
&=\phi_{n+1}^\dagger U_n^\dagger\phi_n.  
\end{aligned}  
$$

Therefore, the full hopping term can be written explicitly as

$$  
\boxed{  
\begin{aligned}  
H_{\mathrm{hop}}  
=\frac{1}{2a}\sum_{n=1}^{N-1}  
\big(  
&\phi_n^\dagger U_n\phi_{n+1}\  
+\phi_{n+1}^\dagger U_n^\dagger\phi_n  
\big).  
\end{aligned}  
}  
$$

The second term describes the reverse hopping process, from site $n$ to site $n+1$. The operator $U_n^\dagger$ accounts for the gauge field in that reverse direction.

We include both terms because the Hamiltonian must be Hermitian. In particular,

$$  
(A_n+A_n^\dagger)^\dagger=A_n+A_n^\dagger.  
$$

This ensures that the hopping contribution has real energy eigenvalues.

The factor $\frac{1}{2a}$ sets the scale of the hopping contribution and comes from the lattice discretization. The sum runs from $n=1$ to $N-1$ because these are the links connecting the $N$ sites under open boundary conditions.

The important idea is that **matter can move between neighbouring sites, but its hopping must account for the gauge field on the link**. This is how the lattice Hamiltonian incorporates gauge-invariant matter dynamics.

#### 2. Fermion mass

The second term is
$$
m\sum_{n=1}^{N}(-1)^n  
\phi_n^\dagger\phi_n.  
$$

Here, $\phi_n^\dagger\phi_n$ counts the occupation of the fermionic mode at site $n$. The parameter $m$ sets the strength of the fermion mass contribution to the energy.

The factor $(-1)^n$ alternates the sign of the contribution between neighbouring sites. This is part of the staggered-fermion formulation, where the two-component structure of the continuum Dirac spinor is encoded across alternating lattice sites.

It does **not** mean that physical electrons have alternating masses.

Notice that this term does not require a separate Hermitian-conjugate contribution. The occupation operator is already Hermitian:
$$\phi_n^\dagger\phi_n.$$
For the massless Schwinger model, we set $m=0$, making this term vanish. However, the paper retains the mass parameter and uses $m=1$ in its default numerical calculations. The Hamiltonian above therefore describes the more general massive lattice model, with the massless case obtained by setting $m=0$.

#### 3. Electric-field energy

The third term is

$$  
H_E=  
\frac{g^2a}{2}\sum_{n=1}^{N-1}L_n^2.  
$$

Recall that each link carries an electric flux $L_n$. This term assigns energy to the electric field on every link.

The square $L_n^2$ means that the contribution depends on the magnitude of the flux, not its sign. A link with a larger magnitude of electric flux contributes more energy.

The factor $\frac{g^2a}{2}$ comes from expressing the electric-field energy in the lattice formulation. The coupling $g$ controls the interaction strength, while $a$ is the lattice spacing.

Unlike the hopping term, this expression is already Hermitian because the electric-field operator $L_n$ is Hermitian. Consequently, no additional Hermitian-conjugate term is needed.

Notice that the external field $\varepsilon$ does not appear explicitly in this version of the Hamiltonian. In the paper, it enters through the boundary condition for the electric field.

#### 4. What about the external electric field?

The paper uses **open boundary conditions** and sets the electric field at the left boundary to a constant external field $\varepsilon$:

$$  
L_0=\varepsilon.  
$$

Gauss's law relates the difference between the outgoing and incoming electric flux at site $n$ to the charge at that site:
$$
\phi_n^\dagger\phi_n  
-\frac{1-(-1)^n}{2}.  
$$

The right-hand side is the staggered charge operator,

$$  
Q_n=  
\phi_n^\dagger\phi_n  
-\frac{1-(-1)^n}{2}.  
$$

The occupation operator gives the fermion number at site $n$, while the subtraction term accounts for the staggered background charge. It is zero at even sites and one at odd sites.

Starting with $L_0=\varepsilon$, we can repeatedly apply Gauss's law to determine the electric flux on each link:

$$  
\boxed{  
L_n=\varepsilon+  
\sum_{l=1}^{n}  
\left(  
\phi_l^\dagger\phi_l  
-\frac{1-(-1)^l}{2}  
\right).  
}  
$$

In other words, the electric flux on a link is determined by the external field at the boundary and the cumulative charge distribution to its left.

This is a particularly useful feature of the Schwinger model. In one spatial dimension, the gauge field has no independent propagating degrees of freedom. Under open boundary conditions, Gauss's law allows us to express the electric field in terms of the matter charges and the boundary field.

The electric flux therefore does not need to be treated as an independent variable once we impose this constraint and specify the boundary condition.

#### 5. Eliminating the gauge-link variables

Recall that the hopping term contains the gauge-link variable $U_n$:

$$  
\phi_n^\dagger U_n\phi_{n+1}.  
$$

In the open-boundary formulation used by the paper, a gauge transformation can absorb the link variables from the hopping term. The hopping contribution then takes the form
$$
\frac{1}{2a}\sum_{n=1}^{N-1}  
\left(  
\phi_n^\dagger\phi_{n+1}  
+\mathrm{H.c.}  
\right).  
$$

Its Hermitian conjugate is now simply
$$
\phi_{n+1}^\dagger\phi_n.  
$$

This does not mean that the gauge field's influence has disappeared. Instead, its contribution survives through the electric-field energy.

Substituting the expression for $L_n$ into $H_E$ gives

$$  
\begin{aligned}  
H_E={}&\frac{g^2a}{2}\sum_{n=1}^{N-1}  
\Bigg[  
\varepsilon+  
\sum_{l=1}^{n}  
\left(  
\phi_l^\dagger\phi_l  
-\frac{1-(-1)^l}{2}  
\right)  
\Bigg]^2.  
\end{aligned}  
$$

The resulting Hamiltonian, written entirely in terms of fermionic operators, is

$$  
\boxed{  
\begin{aligned}  
H={}&\frac{1}{2a}\sum_{n=1}^{N-1}  
\left(  
\phi_n^\dagger\phi_{n+1}  
+\mathrm{H.c.}  
\right)\  
+m\sum_{n=1}^{N}(-1)^n  
\phi_n^\dagger\phi_n\  
+\frac{g^2a}{2}\sum_{n=1}^{N-1}  
\Bigg[  
\varepsilon+  
\sum_{l=1}^{n}  
\left(  
\phi_l^\dagger\phi_l  
-\frac{1-(-1)^l}{2}  
\right)  
\Bigg]^2.  
\end{aligned}  
}  
$$

Notice what has happened: the explicit link variables have disappeared from the hopping term, but the electric-field energy now depends on the cumulative charge distribution. When the square is expanded, it produces interactions involving charges at different sites.

The external field $\varepsilon$ is also now explicit in the Hamiltonian. It changes the background electric-field configuration and therefore affects both the ground state and the system's subsequent evolution.

#### 6. How does the Hamiltonian determine time evolution?

Once we know the Hamiltonian, we can determine how the quantum state changes with time.

For a time-independent Hamiltonian, using natural units where $\hbar=1$, $H|\Psi(t)\rangle.$

Equivalently,
$$  
|\Psi(t)\rangle=e^{-iHt}|\Psi(0)\rangle.  
$$

Here, $|\Psi(0)\rangle$ is the initial quantum state, and $|\Psi(t)\rangle$ is the state after time $t$.

The paper studies what happens when the system is initially prepared in the ground state without an external field and an external electric field is switched on. The Hamiltonian changes to include the new boundary field, and the state evolves under this new Hamiltonian.

By tracking quantities such as the charge distribution, electric-field energy, and overlap with the initial vacuum state, the authors investigate how the system responds to the external field.

**In essence:** the Hamiltonian combines matter hopping, the fermion mass, and electric-field energy into a single description of the system's dynamics. Gauss's law connects the matter charges to the electric flux, allowing the gauge field to be eliminated under the paper's open-boundary setup. The resulting Hamiltonian then determines how the quantum state evolves, including its response when an external electric field is switched on.

### Summary of the Lattice Schwinger Model

### 1. Sites: Matter

Space is discretized into $N$ lattice sites, each containing one fermionic mode described by the operators $\phi_n$ and $\phi_n^\dagger$. These annihilate and create fermions, respectively, while the occupation operator $\phi_n^\dagger\phi_n$ tells us whether the mode is occupied.

In the staggered-fermion formulation, the continuum Dirac spinor's two-component structure is encoded across alternating sites. The charge at each site includes a staggered background-charge subtraction, so occupation and electric charge are not exactly the same thing.

### 2. Links: Electric Field

Each link connects two neighbouring sites and carries a gauge variable $U_n$ and an electric field $L_n$. The gauge variable ensures that matter can hop between sites without violating gauge invariance, while $L_n$ determines the electric-field energy stored on the link.

In one spatial dimension, the gauge field has no independent propagating degrees of freedom. With open boundary conditions, Gauss's law allows the electric field on each link to be determined from the matter charges and the electric field at the boundary.

### 3. Gauss's Law: Connecting Matter and Electric Field

Gauss's law relates the difference between the outgoing and incoming electric flux at a site to the charge at that site:

$$
\phi_n^\dagger\phi_n  
-\frac{1-(-1)^n}{2}.  
$$

Intuitively, the charge at a site determines how the electric flux changes across it. This means that the matter occupations and electric fields cannot be chosen independently.

With open boundary conditions, the electric field at the left boundary is set to an external field $\varepsilon$. The electric field throughout the lattice is then determined by this boundary value and the cumulative charge distribution.

### 4. The Hamiltonian: Governing the Dynamics

The Hamiltonian describes the energy of the system and determines how its quantum state evolves. It contains three main contributions:

- **Matter hopping:** Allows fermions to move between neighbouring sites while accounting for the gauge field.
    
- **Fermion mass:** Describes the contribution of the fermion mass, with an alternating sign arising from the staggered formulation.
    
- **Electric-field energy:** Assigns energy to the electric flux on each link.

The external field $\varepsilon$ enters through the electric-field energy rather than as a separate potential-energy term. After the gauge variables are eliminated using Gauss's law, the Hamiltonian can be written entirely in terms of fermionic operators, with the electric-field energy becoming an interaction involving charges across the lattice.

**In essence:** the matter occupies the sites, the electric field connects neighbouring sites, Gauss's law links the two, and the Hamiltonian determines how the coupled system evolves over time.