import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const articles = [
  {
    id: 1,
    title: "The Science Behind Nasal Breathing",
    excerpt: "Learn how nasal breathing improves oxygen uptake, reduces snoring, and helps with sleep quality.",
    imageUrl: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    content: `
      <h2 class="text-xl font-heading font-semibold mb-4">Why Nasal Breathing Matters</h2>
      <p class="mb-4">Breathing through your nose is the way humans are designed to breathe. The nose acts as a natural filter, humidifier, and temperature regulator for the air you breathe.</p>
      
      <p class="mb-4">When you breathe through your mouth, especially during sleep, you bypass these important functions, which can lead to a variety of health issues including:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li>Increased risk of sleep apnea and snoring</li>
        <li>Reduced oxygen uptake efficiency</li>
        <li>Increased risk of dental issues and bad breath</li>
        <li>Potential for chronic fatigue and brain fog</li>
        <li>More susceptibility to allergies and asthma</li>
      </ul>
      
      <h2 class="text-xl font-heading font-semibold mb-4">The Nitric Oxide Connection</h2>
      
      <p class="mb-4">One of the most significant benefits of nasal breathing is the production of nitric oxide in the nasal passages. Nitric oxide:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li>Helps sterilize the air you breathe</li>
        <li>Improves oxygen circulation throughout the body</li>
        <li>Relaxes vascular smooth muscle, improving blood flow</li>
        <li>Enhances immune function</li>
      </ul>
      
      <p>When you breathe through your mouth, you miss out on these important benefits, making you more susceptible to infection and reducing your body's ability to utilize oxygen efficiently.</p>
    `
  },
  {
    id: 2,
    title: "How to Start Mouth Taping Safely",
    excerpt: "A beginner's guide to mouth taping with safety tips and product recommendations.",
    imageUrl: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    content: `
      <h2 class="text-xl font-heading font-semibold mb-4">Getting Started with Mouth Taping</h2>
      
      <p class="mb-4">Mouth taping is a simple practice that involves placing a small piece of specialized tape over your lips before sleep to encourage nasal breathing. Here's how to start safely:</p>
      
      <h3 class="text-lg font-medium mb-2">Step 1: Choose the Right Tape</h3>
      <p class="mb-4">Not all tapes are created equal. For mouth taping, you should use:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Hypoallergenic, skin-safe tape designed for sensitive skin</li>
        <li>Micropore or surgical tape</li>
        <li>Specialized mouth taping products (often in a small strip design)</li>
      </ul>
      <p class="mb-4">Never use duct tape, electrical tape, or other industrial tapes that can damage your skin or leave harmful residues.</p>
      
      <h3 class="text-lg font-medium mb-2">Step 2: Start Small</h3>
      <p class="mb-4">Begin by using mouth tape for short periods while you're awake to get comfortable with the sensation. Try 15-30 minutes while reading or watching TV.</p>
      
      <h3 class="text-lg font-medium mb-2">Step 3: Test for Comfort</h3>
      <p class="mb-4">When you're ready to try sleeping with mouth tape:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Apply the tape vertically (from top to bottom lip) rather than horizontally</li>
        <li>Use a small piece at first - just enough to create a gentle reminder</li>
        <li>Ensure you can open your mouth if needed (the tape should be gentle enough to break)</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Step 4: Be Consistent</h3>
      <p class="mb-4">Once comfortable, aim to use mouth tape every night. Consistency is key to retraining your breathing patterns and experiencing the full benefits.</p>
      
      <h2 class="text-xl font-heading font-semibold mb-4">Safety Precautions</h2>
      <p class="mb-4">Important safety notes:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Do not mouth tape if you have nasal congestion or respiratory illness</li>
        <li>Consult your healthcare provider before starting if you have sleep apnea</li>
        <li>Remove immediately if you experience anxiety or difficulty breathing</li>
        <li>Make sure you can easily break the seal by opening your mouth if needed</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Benefits of Consistent Mouth Taping",
    excerpt: "Discover the long-term health benefits reported by consistent mouth tapers.",
    imageUrl: "https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    content: `
      <h2 class="text-xl font-heading font-semibold mb-4">Long-Term Benefits of Mouth Taping</h2>
      
      <p class="mb-4">Consistent mouth taping encourages nasal breathing during sleep, which can lead to numerous health benefits over time. Here are some of the most commonly reported improvements:</p>
      
      <h3 class="text-lg font-medium mb-2">Improved Sleep Quality</h3>
      <p class="mb-4">Many mouth tapers report:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Falling asleep faster</li>
        <li>Fewer nighttime awakenings</li>
        <li>Reduced snoring</li>
        <li>More restful sleep overall</li>
        <li>Waking feeling more refreshed</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Respiratory Health</h3>
      <p class="mb-4">Nasal breathing helps:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Filter out allergens and pathogens</li>
        <li>Properly humidify inhaled air</li>
        <li>Reduce instances of sore throat and dry mouth</li>
        <li>Improve asthma symptoms for some individuals</li>
        <li>Reduce susceptibility to respiratory infections</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Dental Health</h3>
      <p class="mb-4">Mouth breathing can lead to dental problems, while nasal breathing helps:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Reduce risk of cavities and gum disease</li>
        <li>Prevent dry mouth, which can lead to bad breath</li>
        <li>Maintain proper oral microbiome</li>
        <li>Reduce plaque formation</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Cognitive Function</h3>
      <p class="mb-4">Better sleep through proper breathing can improve:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Daytime focus and concentration</li>
        <li>Memory and learning capacity</li>
        <li>Mood regulation</li>
        <li>Overall cognitive performance</li>
      </ul>
      
      <h3 class="text-lg font-medium mb-2">Physical Performance</h3>
      <p class="mb-4">Athletes and active individuals often report:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Improved recovery following training</li>
        <li>Better endurance during activity</li>
        <li>Reduced exercise-induced asthma symptoms</li>
        <li>Improved breathing technique during exertion</li>
      </ul>
      
      <p class="mb-4">While individual results may vary, most consistent mouth tapers notice improvements within 1-4 weeks of regular practice.</p>
    `
  }
];

export default function Learn() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-semibold text-slate-900 mb-6">Learn About Mouth Taping</h1>
      
      <Tabs defaultValue="articles">
        <TabsList className="mb-6">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map(article => (
              <Card key={article.id} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-w-16 aspect-h-9 bg-slate-100">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium text-lg text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 flex-1">{article.excerpt}</p>
                  <a href={`#article-${article.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-700">
                    Read Article
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Full articles */}
          {articles.map(article => (
            <div key={article.id} id={`article-${article.id}`} className="mb-12">
              <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-4">{article.title}</h2>
              <div className="aspect-w-21 aspect-h-9 bg-slate-100 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="object-cover h-full w-full"
                />
              </div>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              <Separator className="my-8" />
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">Is mouth taping safe?</h3>
                  <p className="text-slate-700">
                    Mouth taping is generally safe for most people when using appropriate hypoallergenic tape designed for skin. 
                    However, it's not recommended if you have nasal congestion, respiratory issues, or sleep apnea without consulting a healthcare professional.
                    Always use gentle tape that can be easily broken by opening your mouth if needed.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">How long does it take to see results?</h3>
                  <p className="text-slate-700">
                    Many people report improvements in sleep quality and reduced dry mouth within the first few nights.
                    More significant benefits like reduced snoring, better daytime energy, and improved breathing habits
                    may take 2-4 weeks of consistent practice to notice.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">What type of tape should I use?</h3>
                  <p className="text-slate-700">
                    Use only hypoallergenic, skin-safe tape designed for sensitive skin, such as surgical tape, 
                    micropore tape, or specially designed mouth taping products. Never use regular household tapes 
                    like duct tape or electrical tape, which can damage your skin.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">Can children use mouth tape?</h3>
                  <p className="text-slate-700">
                    Mouth taping for children should only be done under the supervision and guidance of a healthcare 
                    professional, particularly one who specializes in pediatric breathing or sleep issues. Children have 
                    different breathing patterns and needs than adults.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">What if I have a cold or allergies?</h3>
                  <p className="text-slate-700">
                    Don't use mouth tape if you have nasal congestion from a cold, allergies, or any respiratory condition 
                    that makes nasal breathing difficult. Resume mouth taping only after your nasal passages are clear again.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-600 mb-2">Should I mouth tape during naps?</h3>
                  <p className="text-slate-700">
                    Once you're comfortable with night-time mouth taping, you can use it during naps as well. The same principles 
                    apply - ensure proper tape application and that you can break the seal easily if needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="science">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-6">The Science of Breathing</h2>
              
              <h3 className="text-lg font-medium text-primary-600 mb-3">Research & Studies</h3>
              <p className="mb-6 text-slate-700">
                Numerous scientific studies have examined the importance of nasal breathing and the impacts of chronic mouth breathing.
                Here are some key findings from recent research:
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary-100 pl-4">
                  <h4 className="font-medium mb-1">Journal of Physiological Anthropology (2019)</h4>
                  <p className="text-slate-600 text-sm mb-2">Nakazawa et al.</p>
                  <p className="text-slate-700">
                    Research demonstrated that nasal breathing activates the parasympathetic nervous system, 
                    promoting relaxation and improved sleep quality compared to mouth breathing, which tends to 
                    activate the sympathetic (stress) response.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-100 pl-4">
                  <h4 className="font-medium mb-1">International Journal of Environmental Research and Public Health (2020)</h4>
                  <p className="text-slate-600 text-sm mb-2">Bartley et al.</p>
                  <p className="text-slate-700">
                    Study found that habitual mouth breathing was associated with increased prevalence of sleep 
                    disturbances, snoring, and reduced cognitive performance in both children and adults.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-100 pl-4">
                  <h4 className="font-medium mb-1">Applied Psychophysiology and Biofeedback (2017)</h4>
                  <p className="text-slate-600 text-sm mb-2">Mason et al.</p>
                  <p className="text-slate-700">
                    Research indicated that conscious nasal breathing practices improved HRV (heart rate variability), 
                    a key indicator of autonomic nervous system health and stress resilience.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-primary-600 mt-8 mb-3">Key Physiological Mechanisms</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Nitric Oxide Production</h4>
                  <p className="text-slate-700">
                    The nasal sinuses produce nitric oxide (NO), a powerful vasodilator that improves oxygen circulation 
                    throughout the body. When breathing through the mouth, you miss this crucial NO production, reducing 
                    oxygen utilization efficiency.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Respiratory Rate Regulation</h4>
                  <p className="text-slate-700">
                    Nasal breathing naturally slows the respiratory rate compared to mouth breathing, leading to more 
                    efficient gas exchange in the lungs and reduced work of breathing during sleep.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Upper Airway Stability</h4>
                  <p className="text-slate-700">
                    Nasal breathing creates increased airway resistance, which helps maintain proper upper airway muscle 
                    tone during sleep, potentially reducing collapse and obstruction that contributes to snoring and sleep apnea.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
