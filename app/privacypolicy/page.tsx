"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/layout"

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
        <div className="container mx-auto px-4 pt-8 pb-32">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center pt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-10"
            >
              Privacy Policy
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto text-left"
            >
              <div className="text-center mb-8">
                <p className="text-lg font-semibold">MEDICI.AC PRIVACY POLICY</p>
                <p className="text-base"><strong>Effective Date:</strong> June 4, 2025</p>
                <p className="text-base"><strong>Last Updated:</strong> June 4, 2025</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <p className="text-sm italic mb-0">
                  This Privacy Policy applies to the website <strong>Medici.ac</strong> operated by <strong>Miruvor LLC</strong> and is effective as of June 4, 2025. The website currently consists of an interest-capture form for prospective students and donors, plus basic web-traffic analytics. No financial transactions are processed through the Site at this time.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. DEFINITIONS AND INTERPRETATION</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Definitions</h3>
              <p>In this Privacy Policy, unless the context otherwise requires:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>"Company," "we," "our," or "us"</strong> refers to Miruvor LLC, a United States limited liability company;</li>
                <li><strong>"Site"</strong> refers to the website located at medici.ac;</li>
                <li><strong>"Service"</strong> refers to the Medici.ac platform and related services;</li>
                <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person;</li>
                <li><strong>"Processing"</strong> means any operation performed on Personal Data;</li>
                <li><strong>"You" or "User"</strong> refers to any individual accessing or using the Site.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">2. CONTROLLER INFORMATION</h2>
              <p><strong>Medici.ac</strong> is a peer-to-peer scholarship platform owned and operated by <strong>Miruvor LLC</strong>, a United States company. Until the full platform launches, the public website at medici.ac serves as an information page and email sign-up portal.</p>
              
              <p><strong>Data Controller Contact Information:</strong></p>
              <ul className="list-none ml-4">
                <li>Email: contact@medici.ac</li>
                <li>Entity: Miruvor LLC</li>
                <li>Jurisdiction: United States</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">3. CATEGORIES OF PERSONAL DATA COLLECTED</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">3.1 Information Collection Table</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">Data Category</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">Specific Data Elements</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">Collection Source</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">Processing Purpose</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Contact Information</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Full name, email address</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Direct submission via web form</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Service inquiry response; platform launch notifications</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Consent (GDPR Art. 6(1)(a)) / Consumer request (CCPA §1798.140)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Educational Information</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">University or college name (students only)</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Direct submission via web form</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Future scholarship matching services</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Consent (GDPR Art. 6(1)(a)) / Consumer request (CCPA §1798.140)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">User Classification</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Role selection: "Donor" or "Student"</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Direct submission via web form</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Communication customization and targeting</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Consent (GDPR Art. 6(1)(a)) / Consumer request (CCPA §1798.140)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Technical Usage Data</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">IP address, browser type and version, referring pages, session duration, device identifiers</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Automated collection via cookies and third-party analytics</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Website performance optimization; spam and abuse prevention</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Legitimate interests (GDPR Art. 6(1)(f))</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-4 mb-2">3.2 Data We Do NOT Collect</h3>
              <p>We explicitly do <strong>NOT</strong> collect or process:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Financial information or payment data</li>
                <li>Government-issued identification numbers</li>
                <li>Health or medical information</li>
                <li>Biometric data</li>
                <li>Any other sensitive personal information as defined under applicable data protection laws</li>
              </ul>
              <p>No financial transactions are currently processed through the Site.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">4. COOKIES AND TRACKING TECHNOLOGIES</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">4.1 Use of Cookies</h3>
              <p>We employ standard web analytics services (including but not limited to Google Analytics, Plausible Analytics, or similar platforms) that utilize cookies and similar tracking technologies in your browser. These technologies serve the following functions:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Monitor website traffic patterns and user navigation behavior</li>
                <li>Analyze site performance and identify areas for improvement</li>
                <li>Generate aggregated usage statistics</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">4.2 Anonymous Data Collection</h3>
              <p>Analytics cookies do <strong>NOT</strong> personally identify individual users. They focus exclusively on aggregated traffic patterns and behavioral analytics. Personal identification occurs only when you voluntarily submit information through our contact form.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">4.3 Cookie Management</h3>
              <p>You retain full control over cookie settings and may clear, block, or disable cookies through your browser settings at any time. Please note that disabling cookies may affect certain website functionality.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">5. LAWFUL BASIS AND PURPOSES OF PROCESSING</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">5.1 Essential Communications</h3>
              <p>We process your contact information to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Acknowledge and respond to your inquiry or interest submission</li>
                <li>Provide requested information regarding the upcoming platform launch</li>
                <li>Send direct, relevant updates about service availability</li>
              </ul>
              <p><strong>Important:</strong> We do NOT send promotional newsletters, marketing surveys, or unsolicited commercial communications.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">5.2 Website Operations and Security</h3>
              <p>We process technical data to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Evaluate website traffic metrics and user engagement</li>
                <li>Debug technical issues and optimize site performance</li>
                <li>Detect, prevent, and respond to spam, abuse, or security threats</li>
                <li>Ensure system stability and availability</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">6. DATA SHARING AND DISCLOSURE</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">6.1 No Commercial Data Sales</h3>
              <p>We do <strong>NOT</strong> sell, rent, lease, or commercially trade your personal data to third parties under any circumstances.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">6.2 Authorized Data Sharing</h3>
              <p>We may share your information only with the following parties under strict contractual protections:</p>

              <h4 className="text-base font-semibold mt-3 mb-1">6.2.1 Service Providers</h4>
              <p>Third-party vendors who provide essential services including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Cloud hosting and database management</li>
                <li>Email delivery and communication services</li>
                <li>Web analytics and performance monitoring platforms</li>
                <li>Technical support and maintenance services</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">6.2.2 Legal and Regulatory Authorities</h4>
              <p>When required by law or to protect legal rights, including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Compliance with valid legal process or court orders</li>
                <li>Response to lawful requests from law enforcement agencies</li>
                <li>Protection of our rights, property, or safety</li>
                <li>Defense against legal claims or investigations</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">6.2.3 Business Successors</h4>
              <p>In the event of a merger, acquisition, or asset sale, your data may be transferred to successor entities subject to the same privacy protections outlined in this Policy.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">7. DATA STORAGE, SECURITY, AND INFRASTRUCTURE</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">7.1 Storage Infrastructure</h3>
              <p>All form submissions and user data are stored in <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Supabase</a>, a United States-hosted, SOC 2 Type II compliant PostgreSQL database-as-a-service platform.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">7.2 Security Measures</h3>
              <p>We implement industry-standard security protections including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Multi-factor authentication for all administrative access</li>
                <li>Encrypted data transmission (TLS/SSL)</li>
                <li>Access controls limited to authorized Miruvor LLC personnel only</li>
                <li>Regular security monitoring and updates</li>
                <li>Compliance with Supabase's comprehensive data protection policies</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">7.3 Data Processing Location</h3>
              <p>Primary data storage and processing occurs within the United States. Supabase's data protection and security policies apply to all stored information.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">8. DATA RETENTION POLICY</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">8.1 Contact and Form Data</h3>
              <p>We retain contact information and form submissions for a maximum period of <strong>twenty-four (24) months</strong> following our last interaction with you, or until you withdraw consent, whichever occurs first.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">8.2 Analytics and Usage Data</h3>
              <p>Aggregated, anonymized usage data may be retained beyond the 24-month period for legitimate business analytics purposes. Such data cannot be linked back to individual users.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">8.3 Backup and Deletion Procedures</h3>
              <p>Upon deletion from active systems, all backup copies containing your personal data are permanently purged within thirty (30) days. Deletion is irreversible and complete.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">9. YOUR PRIVACY RIGHTS</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">9.1 Applicable Rights</h3>
              <p>Depending on your jurisdiction and applicable data protection laws, you may exercise the following rights:</p>

              <h4 className="text-base font-semibold mt-3 mb-1">9.1.1 Access Rights</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Request access to personal information we hold about you</li>
                <li>Obtain copies of your data in a structured, commonly used format</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">9.1.2 Correction and Update Rights</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Correct inaccurate or incomplete personal information</li>
                <li>Update outdated contact or educational details</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">9.1.3 Deletion Rights (Right to be Forgotten)</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Request complete erasure of your personal data</li>
                <li>Immediate removal from all active systems and future communications</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">9.1.4 Processing Control Rights</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Restrict or object to certain types of processing</li>
                <li>Withdraw consent for future processing at any time</li>
                <li>Opt-out of non-essential communications</li>
              </ul>

              <h4 className="text-base font-semibold mt-3 mb-1">9.1.5 Data Portability Rights</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Receive your data in a machine-readable format</li>
                <li>Transfer data to another service provider where technically feasible</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">9.2 Exercising Your Rights</h3>
              <p>To exercise any of these rights, please contact us at: <strong>contact@medici.ac</strong></p>
              <p>We will respond to verified requests within the timeframes required by applicable law (typically 30 days for GDPR requests, 45 days for CCPA requests).</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">10. INTERNATIONAL DATA TRANSFERS</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">10.1 Cross-Border Processing</h3>
              <p>If you are located outside the United States, your personal information may be transferred to, stored, and processed in the United States, which may have different data protection laws than your jurisdiction.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">10.2 Transfer Safeguards</h3>
              <p>We rely on the following legal mechanisms for international transfers:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Your explicit consent provided when submitting information through our web form</li>
                <li>Standard contractual clauses with our service providers</li>
                <li>Adequacy decisions where applicable</li>
                <li>Derogations for specific situations as permitted under applicable law</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">11. CHILDREN'S PRIVACY PROTECTION</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">11.1 Age Restrictions</h3>
              <p>The Site is not directed to, intended for, or designed to attract children under the age of sixteen (16) years. We do not knowingly collect personal information from children under 16.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">11.2 Parental Notice and Deletion</h3>
              <p>If we become aware that we have inadvertently collected personal information from a child under 16, we will take immediate steps to delete such information from our systems. Parents or guardians who believe their child has provided personal data should contact us immediately at contact@medici.ac.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">12. POLICY UPDATES AND AMENDMENTS</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">12.1 Modification Authority</h3>
              <p>We reserve the right to update, modify, or amend this Privacy Policy at any time to reflect changes in our practices, legal requirements, or business operations.</p>

              <h3 className="text-lg font-semibold mt-4 mb-2">12.2 Notice of Changes</h3>
              <p>Material changes to this Policy will be communicated through:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Updated "Effective Date" at the top of this document</li>
                <li>Prominent notice banner on the Site for significant modifications</li>
                <li>Direct email notification where legally required or practically feasible</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">12.3 Continued Use</h3>
              <p>Your continued use of the Site following the posting of changes constitutes acceptance of such changes. If you disagree with any modifications, please discontinue use and contact us to delete your information.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">13. CONTACT INFORMATION AND COMPLAINTS</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">13.1 Primary Contact</h3>
              <p>For all privacy-related questions, concerns, or requests, please contact:</p>
              <ul className="list-none ml-4 space-y-1">
                <li><strong>Email:</strong> contact@medici.ac</li>
                <li><strong>Response Time:</strong> We aim to respond within 5 business days</li>
                <li><strong>Data Controller:</strong> Miruvor LLC</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">13.2 Regulatory Complaints</h3>
              <p>If you believe we have not adequately addressed your privacy concerns, you have the right to lodge a complaint with your local data protection authority or supervisory body.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">14. LEGAL COMPLIANCE AND GOVERNING LAW</h2>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">14.1 Applicable Laws</h3>
              <p>This Privacy Policy and our data processing practices comply with applicable privacy and data protection laws, including but not limited to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>General Data Protection Regulation (GDPR) - EU/EEA residents</li>
                <li>California Consumer Privacy Act (CCPA) - California residents</li>
                <li>Virginia Consumer Data Protection Act (VCDPA) - Virginia residents</li>
                <li>Other applicable state and federal privacy regulations</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">14.2 Governing Law</h3>
              <p>This Privacy Policy shall be governed by and construed in accordance with the laws of the United States and the state in which Miruvor LLC is organized, without regard to conflict of law principles.</p>

              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6 mt-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-center font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    CONSENT TO DATA PROCESSING
                  </p>
                  <p className="text-sm text-center text-blue-700 dark:text-blue-300 italic">
                    By submitting any form on this website, you expressly consent to Medici.ac storing your submitted information in Supabase and contacting you regarding the upcoming platform launch in accordance with this Privacy Policy.
                  </p>
                </div>
              </div>

              <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Document Version: 1.0 | Last Updated: June 4, 2025 | Next Review: December 4, 2025
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}